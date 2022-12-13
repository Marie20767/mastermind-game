import '@testing-library/cypress/add-commands';

Cypress.Commands.add('setSolution', () => {
  cy.visit('/');
  window.localStorage.setItem('solution', JSON.stringify(['#f7d840', '#06ba7e', '#2b9de5', '#2b9de5']));
});
