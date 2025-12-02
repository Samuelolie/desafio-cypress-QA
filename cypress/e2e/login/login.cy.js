/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("Login", () => {
  let email;
  let password;
  let urlEcommerce = "http://lojaebac.ebaconline.art.br/";
  let urlRegister = "http://lojaebac.ebaconline.art.br/minha-conta/";
  beforeEach(() => {
    cy.visit(urlEcommerce);
    email = faker.internet.email();
    password = faker.internet.password({ length: 20 });
    cy.registerEmail(email, password);
  });

  it("Login com sucesso", () => {
    cy.login(email, password);
    const emailPrefix = email.split("@")[0].toLowerCase();
    cy.get("p strong").first().should("to.contain", emailPrefix);
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
    cy.url().should("eq", urlEcommerce);
  });

  it("Logout com sucesso - Botão Sair", () => {
    cy.logoutSair(email, password);
    cy.url().should("eq", urlRegister);
    cy.get("#username").should("exist").and("have.value", "");
    cy.get("#password").should("exist").and("have.value", "");
  });
});
