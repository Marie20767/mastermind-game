describe('renders the app', () => {
  beforeEach(() => {
    cy.visit('/');
    // using commands:
    // cy.login();
  });

  it('app container renders correctly', () => {
    cy.get('.App').should('exist');
  });
});

// Examples:
// cy.get(.date).type("2021-02-17")
// Find the celtics and click on the  url that gives more info about the team
// cy.findByText("Boston Celtics").should("exist")
// cy.findByText("Boston Celtics").click();
// cy.url().should("include", "teams/2");
// cy.findByText("Confrerence: East").should("exist")

// it('add todo', () => {
// cy.findByRole('textbox', { name: 'title' })
// .type('Todo1')
// .type('{enter}')
// cy.findByText("Todo1").should('exist')
// })
// it('remove todo', () => {
// cy.findByRole('textbox', { name: /title/i })
// .type('Todo1')
// .type('{enter}')

// cy.wait(2000) -> otherwise the remove happens too fast
// cy.findByRole('button', {name: remove}).click()
// cy.findByText('todo1').should('not exist')

// If you have multiple buttons that are called the same you can use test-id called data-cy
// then: cy.get('[data-cy=todo-Todo1]').within(() => {
// cy.findByRole('button', {name: 'remove'}).click()
// })
// })

// E2E Example:
describe('todos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('user can add, check and delete todos', () => {
    cy.findByRole('textbox', { name: /title/i })
      .type('Todo1')
      .type('{enter}');

    cy.findByRole('textbox', { name: /title/i })
      .type('Todo2')
      .type('{enter}');

    cy.findByText('Todo1').should('exist');
    cy.findByText('Todo2').should('exist');
    cy.findByText('total todos: 3').should('exist');
  });

  cy.findByRole('checkbox', { name: 'todo2' }).check();
  cy.findByText('selected todos: 1').should('exist');
  cy.get('[data-cy=todo-Todo1]').within(() => {
    cy.findByRole('button', { name: 'remove' }).click();
  });

  cy.findByText('total todos: 1').should('exist');
});

export {};
