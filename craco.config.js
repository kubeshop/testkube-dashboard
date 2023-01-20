const CracoAlias = require('craco-alias');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    configure: webpackConfig => {
      webpackConfig.optimization.minimizer = [new TerserWebpackPlugin({sourceMap: false, parallel: true})];
      webpackConfig.optimization.minimize = true;
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './paths.json',
        unsafeAllowModulesOutsideOfSrc: false,
        debug: false,
      },
    },
  ],
};
