describe("Favourite page", () => {
  it("should render a list of cats on load", () => {
    cy.visit(`http://localhost:5173/favorites`);

    cy.url().should("include", "/favorites");
    cy.contains("Select a breed").should("not.exist");
    cy.contains("Select a limit").should("not.exist");
  });
});
