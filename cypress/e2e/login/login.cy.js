/// <reference types="cypress" />

describe("Login", () => {
  let email;
  let password;
  beforeEach(() => {
    cy.visit("http://lojaebac.ebaconline.art.br/");
    email = Cypress.env("email");
    password = Cypress.env("senha");
  });

  it("Login com sucesso", () => {
    cy.login(email, password);
    cy.get("p strong").first().should("to.contain", "samuoliveira1711");
  });

  it("Login incorreto", () => {
    let emailIncorreto = "teste.com";
    let passwordIncorreto = "teste@teste";
    cy.login(emailIncorreto, passwordIncorreto);
    cy.get("li strong")
      .filter(':contains("Erro")')
      .parent()
      .should(
        "contain.text",
        "Erro: O usuário teste.com não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail."
      );
  });

  it("Logout com sucesso - Botão cabeçalho", () => {
    cy.logoutCabecalho(email, password);
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/");
  });

  it("Logout com sucesso - Botão Sair", () => {
    cy.logoutSair(email, password);
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get("#username").should("exist").and("have.value", "");
    cy.get("#password").should("exist").and("have.value", "");
  });
});
