import commonjs from "rollup-plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import external from "rollup-plugin-peer-deps-external";
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';
import path from "path";
import glob from 'glob';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const input = "./src/index.ts";

const inputSrcs = [...glob.sync('./src/components/*/').map((el) => `./src/components/${path.parse(el).name}`)];

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const babelConfig = {
  babelrc: false,
  extensions,
  runtimeHelpers: true,
  exclude: /node_modules/,
  presets: ['@babel/env', '@babel/preset-react'],
  plugins:['babel-plugin-typescript-to-proptypes']
};

const plugins = [
    replace({
        preferBuiltins: true,
        preventAssignment: true,
    }),
    external(),
    scss(),
    injectStyleFunctions(),

    resolve(),
    commonjs({
        // include: 'node_modules/**',
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        namedExports: {
            // 'node_modules/react/index.js': [
            //     'cloneElement',
            //     'createContext',
            //     'Component',
            //     'createElement'
            // ],
            // 'node_modules/react-dom/index.js': ['render', 'hydrate'],
            'node_modules/react-is/index.js': [
                'isElement',
                'isValidElementType',
                'ForwardRef',
                'Memo',
                'isFragment'
            ]
        }
    }),
    typescript({
        tsconfig: './tsconfig.json',
        useTsconfigDeclarationDir: true,
    }),
    babel(babelConfig),

]

const subFolderPlugins = (folderName) => [
    ...plugins,
    generatePackageJson({
        baseContents: {
            name: `${'namet'}/${folderName}`,
            private: true,
            main: '../cjs/index.js',
            module: './index.js',
            types: './index.d.ts',
        },
    }),
];
const folderBuilds = inputSrcs.map((folder) => {
    let outPut = folder.replace('./src','./')
    return {
        input: `${folder}/index.ts`,
        output: {
            file: `lib/esm/${outPut}/index.js`,
            sourcemap: true,
            exports: 'named',
            format: 'esm',
        },
        plugins: subFolderPlugins(folder),
        external: ['react', 'react-dom'],
    };
});

export default [
  // {
  //   input,
  //   output: [{
  //     file: 'lib/cjs/index.js',
  //     format: "cjs",
  //     sourcemap: true
  //   },
  //   {
  //   file: 'lib/esm/index.es.js',
  //   format: "esm",
  //   sourcemap: true,
  //   }
  //   ],
  //   plugins: [
  //       ...plugins
  //   ]
  // },
    ...folderBuilds,
];



function injectStyleFunctions() {
  return {
    name: 'injectStyleFunctions',
    async transform(code, id) {
      const sanitizeName = () => `library`;
      const injectCode = () => `
var refs = 0;
var insertCss = require("isomorphic-style-loader/insertCss");
var content = typeof css === 'string' ? [[module.id, css, '']] : css;
const _getContent = function() { return content; };
const _getCss = function() { return '' + css; };
const _insertCss = function(options) { return insertCss(content, { ...options, prefix: "${id}" }) };
export default {
  css,
  _getContent,
  _getCss,
  _insertCss,
}
// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (module.hot && typeof window !== 'undefined' && window.document) {
  var removeCss = function() {};
  module.hot.accept("${sanitizeName()}", function() {
    removeCss = insertCss(content, { replace: true, prefix: "${id}" });
  });
  module.hot.dispose(function() {
    removeCss(); 
  });
}
`;
      if (id.includes('.css')) {
        code = code.replace('export default css', injectCode());
      } else if (id.includes('.scss')) {
        code = `${code.replace('export default', 'var css = ')};\n${injectCode()}`;
      } else {
        code = null;
      }
      return code ? { id, code } : null;
    },
  };
}

