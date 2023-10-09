/**
 * Build Jest configuration, that could be used outside CRA/Craco.
 * It may be used i.e. for Wallaby.js automatic configuration.
 *
 * @see {@link https://wallabyjs.com/}
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const {loadCracoConfig} = require('@craco/craco/dist/lib/config');
const {getCraPaths, loadJestConfigProvider} = require('@craco/craco/dist/lib/cra');
const {validateCraVersion} = require('@craco/craco/dist/lib/validate-cra-version');
const {overridePaths} = require('@craco/craco/dist/lib/features/paths/override');
const {overrideJest} = require('@craco/craco/dist/lib/features/jest/override');
const {mergeJestConfig} = require('@craco/craco/dist/lib/features/jest/merge-jest-config');

const context = {env: process.env.NODE_ENV};
const cracoConfig = loadCracoConfig(context);
validateCraVersion(cracoConfig);
context.paths = getCraPaths(cracoConfig);
context.paths = overridePaths(cracoConfig, context);
overrideJest(cracoConfig, context);

module.exports = mergeJestConfig(cracoConfig, loadJestConfigProvider(cracoConfig), context);
