describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit(`/login`);
    cy.get('input[placeholder="johndoe@gmail.com"]').should('be.visible');
    cy.get('input[placeholder="Your secret code..."]').should('be.visible');
    cy.get('button')
      .contains(/^Submit$/)
      .should('be.visible');
  });

  it('should display email validation on email input error', () => {
    cy.visit(`/login`);
    cy.get('button')
      .contains(/^Submit$/)
      .click();
    cy.contains(/^Invalid email$/);
  });

  it('should display password validation on password input error', () => {
    cy.visit(`/login`);
    cy.get('button')
      .contains(/^Submit$/)
      .click();
    cy.contains(/^Password must be at least 6 characters.$/);
  });

  it('should display thread feed when email and password are correct', () => {
    cy.visit(`/login`);
    cy.get('input[placeholder="johndoe@gmail.com"]').type('nabil123@gmail.com');
    cy.get('input[placeholder="Your secret code..."]').type('123456');
    cy.get('button')
      .contains(/^Submit$/)
      .click();

    cy.url().should('include', '/');
    cy.contains(/^Logout$/);
  });
});
