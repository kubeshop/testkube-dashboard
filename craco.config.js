const CracoAlias = require('craco-alias');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new MonacoEditorWebpackPlugin({
          languages: ['yaml'],
          customLanguages: [
            {
              label: 'yaml',
              entry: 'monaco-yaml',
              worker: {
                id: 'monaco-yaml/yamlWorker',
                entry: 'monaco-yaml/yaml.worker',
              },
            },
          ],
        }),
      ],
    },
    configure: webpackConfig => {
      if (process.env.NODE_ENV !== 'development') {
        webpackConfig.optimization.minimizer = [new TerserWebpackPlugin({sourceMap: false, parallel: true})];
        webpackConfig.optimization.minimize = true;
      }
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
