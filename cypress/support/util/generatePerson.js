import { faker } from "@faker-js/faker";

Cypress.Commands.add("generateFakeUser", () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.helpers
      .fromRegExp(/\([1-9]{2}\) 9[6-9][0-9]{3}-[0-9]{4}/)
      .replace(/\\/g, ""),
    zip: faker.location.zipCode("#####-###"),
    city: faker.location.city(),
    address: faker.location.streetAddress(),
  };
});
