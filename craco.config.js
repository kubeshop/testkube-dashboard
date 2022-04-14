const CracoAlias = require('craco-alias');
const CracoAntDesignPlugin = require('craco-antd');

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
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#7984F4',
          '@success-color': '#94D89C',
          '@error-color': '#DB539C',
          '@skeleton-color': '#303030',
          '@skeleton-to-color': '#434343',
          '@heading-color': '#fff',
          '@text-color': '#fff',
        },
      },
    },
  ],
};
