Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
  cy.get("#username").type(email);
  cy.get("#password").type(password);
  cy.get('input[name="login"]').click();
});

Cypress.Commands.add("logoutCabecalho", (email, password) => {
  cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
  cy.login(email, password);
  cy.get('a[href*="action=logout"]').click();
});

Cypress.Commands.add("logoutSair", (email, password) => {
  cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
  cy.login(email, password);
  cy.contains("a", "Sair").click();
});

Cypress.Commands.add("registerEmail", (email, password) => {
  cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
  cy.get("#reg_email").type(email);
  cy.get("#reg_password").type(password);
  cy.get(`input[name="register"]`).click();
  cy.get('a[href*="action=logout"]').click();
});
