describe("Navigation", () => {
  it.skip("should visit root", () => {
    cy.visit"/");
  });
  it.skip("should navigate to Tuesday", () => {
    cy.visit"/");
    cy.contains ("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});