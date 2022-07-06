/// <reference types="cypress" />

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  config.env.endpoint = 'https://demo.testkube.io/results/v1';
  return config;
};
