export function getBaseUrl() {
  const env = Cypress.env('ENV');
  if (env === 'demo') {
    return 'https://demo.testkube.io';
  } 
  if (env === 'dev') {
    return'http://localhost:3000';
  }
  return '';
}