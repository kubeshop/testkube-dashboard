const path = require('node:path');
const {pathsToModuleNameMapper} = require('ts-jest');
const {loadConfig: loadTsConfig} = require('tsconfig-paths');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {sentryWebpackPlugin} = require('@sentry/webpack-plugin');

const {paths} = loadTsConfig('.');

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
        sentryWebpackPlugin({
          org: 'kubeshop',
          project: 'testkube-oss',
          include: './build',
          release: {name: process.env.REACT_APP_VERSION},
          authToken: process.env.SENTRY_AUTH_TOKEN,
          disabled: !process.env.SENTRY_AUTH_TOKEN || !process.env.REACT_APP_VERSION,
        }),
      ],
    },
    configure: webpackConfig => {
      webpackConfig.entry = [
        path.join(__dirname, 'src', 'sentry.ts'),
        path.join(__dirname, 'src', 'index.tsx'),
      ];
      webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({
        extensions: webpackConfig.resolve.extensions,
      }));

      // Delete Prettier functionality from monaco-yaml, as it's very heavy
      const prettierStub = path.join(__dirname, 'stubs', 'prettier.js');
      webpackConfig.resolve.alias['prettier/standalone.js$'] = prettierStub;
      webpackConfig.resolve.alias['prettier/parser-yaml.js$'] = prettierStub;

      return webpackConfig;
    },
  },
  jest: {
    configure: (config) => ({
      ...config,
      moduleNameMapper: {
        ...config.moduleNameMapper,
        ...pathsToModuleNameMapper(paths, {prefix: '<rootDir>/'}),
      },
    }),
  },
};
