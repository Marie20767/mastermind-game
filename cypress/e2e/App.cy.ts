describe('renders the app', () => {
  beforeEach(() => {
    cy.visit('/');
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

export {};
