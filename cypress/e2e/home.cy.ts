describe("Home page", () => {
  it("should render a list of cats on load", () => {
    cy.visit(`http://localhost:5173`);
    cy.contains("Select a breed").should("exist");
    cy.contains("Select a breed").should("exist");

    cy.get('[data-testid="cat-card"]').should("exist");
    
  });
});
