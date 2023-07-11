const path = require('node:path');
const CracoAlias = require('craco-alias');
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
          features: ['caretOperations', 'clipboard', 'contextmenu', 'hover', 'indentation', 'lineSelection', 'suggest']
        }),
      ],
    },
    configure: webpackConfig => {
      // Delete Prettier functionality from monaco-yaml, as it's very heavy
      const prettierStub = path.join(__dirname, 'stubs', 'prettier.js');
      webpackConfig.resolve.alias['prettier/standalone.js$'] = prettierStub;
      webpackConfig.resolve.alias['prettier/parser-yaml.js$'] = prettierStub;

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
