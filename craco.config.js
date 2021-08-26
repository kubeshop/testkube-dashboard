const CracoAlias = require('craco-alias');
const CracoLessPlugin = require("craco-less");
const {getThemeVariables} = require('antd/dist/theme');

module.exports = {
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
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: getThemeVariables({
              'dark': true
            }),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
