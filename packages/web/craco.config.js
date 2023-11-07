const path = require('node:path');
const glob = require('glob');
const {pathsToModuleNameMapper} = require('ts-jest');
const {loadConfig: loadTsConfig} = require('tsconfig-paths');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {sentryWebpackPlugin} = require('@sentry/webpack-plugin');

const {paths} = loadTsConfig('.');

module.exports = {
  webpack: {
    plugins: {
      add: [
        process.env.SENTRY_AUTH_TOKEN && process.env.REACT_APP_VERSION
          ? sentryWebpackPlugin({
              org: 'kubeshop',
              project: 'testkube-oss',
              include: './build',
              release: {name: process.env.REACT_APP_VERSION},
              authToken: process.env.SENTRY_AUTH_TOKEN,
              disabled: !process.env.SENTRY_AUTH_TOKEN || !process.env.REACT_APP_VERSION,
              telemetry: false,
            })
          : null,
      ].filter(Boolean),
    },
    configure: webpackConfig => {
      webpackConfig.entry = [path.join(__dirname, 'src', 'sentry.ts'), path.join(__dirname, 'src', 'index.tsx')];
      webpackConfig.resolve.plugins.push(
        new TsconfigPathsPlugin({
          extensions: webpackConfig.resolve.extensions,
        })
      );

      // TODO: use TsConfigSplitPaths if we want to have local aliases too
      const srcPath = path.join(__dirname, 'src');
      const packagesPaths = glob.sync(path.resolve(path.join(__dirname, '..', '*'))).filter(x => !x.endsWith('/web'));

      // Allow compiling the other modules
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (!rule.oneOf) {
          return rule;
        }
        return {
          ...rule,
          oneOf: rule.oneOf.map(x => ({
            ...x,
            include: x.include === srcPath ? [srcPath, ...packagesPaths, /@testkube\//] : x.include,
            exclude:
              x.include === srcPath
                ? packagesPaths.map(packagePath => path.join(packagePath, 'node_modules'))
                : x.exclude,
          })),
        };
      });

      return webpackConfig;
    },
  },
  jest: {
    configure: config => ({
      ...config,
      moduleNameMapper: {
        ...config.moduleNameMapper,
        ...pathsToModuleNameMapper(paths, {prefix: '<rootDir>/'}),
      },
    }),
  },
};
