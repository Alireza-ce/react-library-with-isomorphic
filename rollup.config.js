import commonjs from "rollup-plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import external from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';


const input = "./src/index.ts";

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const babelConfig = {
  babelrc: false,
  extensions,
  runtimeHelpers: true,
  exclude: /node_modules/,
  presets: ['@babel/env', '@babel/preset-react'],
};

export default [
  // CommonJS
  {
    input,
    output: [{
      file: 'lib/cjs/index.js',
      format: "cjs",
      sourcemap: true
    },
    {
    file: 'lib/esm/index.es.js',
    format: "esm",
    sourcemap: true,
    }],
    plugins: [
      babel(babelConfig),
      external(),
      scss(),
      resolve(),
      commonjs({
            include: 'node_modules/**',
            // left-hand side can be an absolute path, a path
            // relative to the current directory, or the name
            // of a module in node_modules
            namedExports: {
                'node_modules/react/index.js': [
                    'cloneElement',
                    'createContext',
                    'Component',
                    'createElement'
                ],
                'node_modules/react-dom/index.js': ['render', 'hydrate'],
                'node_modules/react-is/index.js': [
                    'isElement',
                    'isValidElementType',
                    'ForwardRef',
                    'Memo',
                    'isFragment'
                ]
            }
        }),
      typescript({ tsconfig: "./tsconfig.json" }),
      injectStyleFunctions(),
    ]
  },
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

