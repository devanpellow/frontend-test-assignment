describe("Home page", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:5173`);

    // intercept request and return cypress fixture list of cats, favourite cats, and breeds
  });

  it("should render a list of cats on load", () => {
    cy.contains("Select a breed").should("exist");
    cy.contains("Select a breed").should("exist");

    // intercept request and return cypress fixture list of cats
    // assert that all cats are rendered
    cy.get('[data-testid="cat-card"]').should("exist");
  });
  it("should refetch list when a different breed is selected", () => {
    cy.get('[data-testid="dropdown-input-btn"]').click();
    cy.get('[data-testid="dropdown-option-Aegean"]').click();
    // intecept request and return cypress fixture list of Aegean cats
  });
  it("should refetch list when a limit is updated", () => {
    cy.get('[data-testid="dropdown-select-btn"]').click();
    cy.get('[data-testid="dropdown-option-25"]').click();
    // intecept request and return cypress fixture list of Aegean cats
  });
  it("should render a spinner while loading", () => {});
  it("should open a modal when unfavouriting a cat", () => {});
  it("should open a modal when removing a cat", () => {});
});
