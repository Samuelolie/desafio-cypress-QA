/// <reference types="cypress" />
describe("E2E Checkout", () => {
  beforeEach(() => {
    cy.visit("http://lojaebac.ebaconline.art.br/");
  });

  it("Checkout com sucesso", () => {
    cy.selectProduct("Ingrid Running Jacket", "S", "Red");
    cy.buyProduct();
    cy.generateFakeUser().then((person) => {
      cy.formBuyer(
        person.firstName,
        person.lastName,
        person.address,
        person.city,
        person.zip,
        person.phone,
        person.email
      );
    });
    cy.checkout();
    cy.get("h1.page-title").should("have.text", "Pedido recebido");
    cy.get("p.woocommerce-thankyou-order-received").should(
      "have.text",
      "Obrigado. Seu pedido foi recebido."
    );
  });

  it("Checkout selecionado produto sem estoque", () => {
    cy.selectProduct("Ingrid Running Jacket", "XS", "Orange");
    cy.get("p.stock.out-of-stock").should("have.text", "Fora de estoque");
  });

  it("Checkout informando campo inválido", () => {
    cy.selectProduct("Ingrid Running Jacket", "S", "Red");
    cy.buyProduct();
    cy.generateFakeUser().then((person) => {
      person.phone = "12x3231";
      cy.formBuyer(
        person.firstName,
        person.lastName,
        person.address,
        person.city,
        person.zip,
        person.phone,
        person.email
      );
    });
    cy.checkout();
    cy.get('li[data-id="billing_phone"]').should(
      "contain",
      `O campo "Telefone" do endereço de faturamento não é um número de telefone válido.`
    );
  });

  it("Checkout sem informar campo obrigatório", () => {
    cy.selectProduct("Ingrid Running Jacket", "S", "Red");
    cy.buyProduct();
    cy.formBuyer(
      "teste",
      "teste",
      "{selectall}{backspace}",
      "teste",
      "1324",
      "23",
      "teste@teste.com.br"
    );
    cy.checkout();
    cy.get('li[data-id="billing_address_1"]').should(
      "contain",
      `O campo "Endereço" do endereço de faturamento é um campo obrigatório.`
    );
  });
});
