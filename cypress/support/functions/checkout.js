Cypress.Commands.add("selectProduct", (product, size, color) => {
  cy.contains(".product-block", product).as("product");

  cy.get("@product").find("a.product-image").click();
  cy.wait(1000);
  cy.get(
    `ul[data-attribute_name="attribute_size"] li[data-value="${size}"]`
  ).click();
  cy.wait(1000);
  cy.get(
    `ul[data-attribute_name="attribute_color"] li[data-value="${color}"]`
  ).click();

  cy.get("button.single_add_to_cart_button")
    .should("be.visible")
    .then(($btn) => {
      cy.wait(1000);
      if ($btn.hasClass("disabled")) {
        cy.log("Escolha outro produto - Produto sem estoque");
      } else {
        cy.wrap($btn).click();
      }
    });
});

Cypress.Commands.add("buyProduct", () => {
  cy.get('button.single_add_to_cart_button[type="submit"]').click();
  cy.visit("http://lojaebac.ebaconline.art.br/carrinho/");
  cy.contains("a.checkout-button", "Concluir compra").click();
});

Cypress.Commands.add(
  "formBuyer",
  (name, lastName, address, city, postalCode, phone, email) => {
    cy.get("#billing_first_name").type(name);
    cy.get("#billing_last_name").type(lastName);
    cy.get("#billing_address_1").type(address);
    cy.get("#billing_city").type(city);
    cy.get("#billing_postcode").type(postalCode);
    cy.get("#billing_phone").type(phone);
    cy.get("#billing_email").type(email);
  }
);

Cypress.Commands.add("checkout", () => {
  cy.get("#terms").click();
  cy.get('input[data-value="Finalizar compra"]').click();
});
