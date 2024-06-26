describe("Favourite page", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:5173/favorites`);
    // intercept request and return cypress fixture list of favourite cats
    cy.url().should("include", "/favorites");
  });

  it("should render favourite cats if there are any", () => {
    cy.contains("Select a breed").should("not.exist");
    cy.contains("Select a limit").should("not.exist");
  });

  it("should render a message if there are no favourite cats", () => {
    // intercept request and return cypress fixture list of no favourited cats
    cy.contains("You haven't chosen your favourite cat pictures yet!").should(
      "exist"
    );
  });
  it("should open a modal when unfavouriting a cat", () => {
    cy.get('[data-testid="toggle-favourite-btn"]').first().click();
    cy.contains(
      "Are you sure you want to remove this cat from your favorites?"
    ).should("exist");
    cy.contains("Confirm").click();
    // intercept request and return cypress fixture list of no favourited cats
  });
});
