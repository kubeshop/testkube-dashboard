/// <reference types="cypress" />

require('dotenv').config();

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  config.env.endpoint = process.env.REACT_APP_API_SERVER_ENDPOINT;
  return config;
};
