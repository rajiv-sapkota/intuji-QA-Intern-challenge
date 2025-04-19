const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      environment: "prod",
      chromeWebSecurity: false,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
