const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    env: {
      email: process.env.EMAIL,
      senha: process.env.SENHA,
    },
  },
});
