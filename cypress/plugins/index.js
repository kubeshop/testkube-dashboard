/// <reference types="cypress" />
import env from '../../src/env';

require('dotenv').config();

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  config.env.endpoint = env.apiUrl;
  return config;
};
