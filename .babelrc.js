const { BABEL_ENV } = process.env;
const loose = true;

module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        loose,
        modules: false,
        exclude: [
          '@babel/plugin-transform-regenerator',
          '@babel/plugin-transform-parameters',
        ],
      },
    ],
  ],
  plugins: [
    BABEL_ENV && [
      '@babel/transform-runtime',
      {
        version: require('./package.json').dependencies[
           '@babel/runtime'
           ].replace(/^[^0-9]*/, ''),
      },
    ],
  ].filter(Boolean),
}