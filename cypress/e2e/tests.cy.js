///<reference types="cypress" />;
const testData = require("../fixtures/testData");
import ValidatePage from "../pages/validatePage"

describe("Test cases for student registration form DEMOQA", () => {
  beforeEach(() => {
    // Runs before every test
    cy.accessBaseUrl();
  });
  it("TC101: validate form submission with valid data ", () => {
    cy.get("#firstName").type(testData.firstName); //enter first name
    cy.get("#lastName").type(testData.lastName); //enter lastname
    cy.get("#userEmail").type(testData.email); //enter email

    cy.contains("label", "Male").click(); //select male gender
    cy.get("#userNumber").type("9843530325"); //enter phone number

    const subjects = ["Maths", "Computer Science"]; //choose subjects
    subjects.forEach((subject) => {
      cy.get(".subjects-auto-complete__value-container")
        .click()
        .type(`${subject}{enter}`);
    });

    cy.contains("Sports").click(); //to check multiple hobbies
    cy.contains("Music").click();

    cy.get("#uploadPicture").attachFile("sampleImage.jpg"); //select picture

    cy.get("#currentAddress").type("Kathmandu Nepal"); //enter address
    cy.contains("Select State").type("NCR{enter}"); //to select state
    cy.get("#submit").click(); //to click submit button
    cy.get("#example-modal-sizes-title-lg")
      .should("be.visible")
      .should("have.text", "Thanks for submitting the form");

    cy.get("#closeLargeModal").scrollIntoView();
    cy.get("#closeLargeModal").click({ force: true });
  });

  // POM implementation
  it.only("TC102:should validate if form can be validated with only required fields", () => {
    const validatePage = new ValidatePage(); //creating instance of class
    validatePage.fillFirstName(testData.firstName) //enter first name
    validatePage.fillLastName(testData.lastName);//enter lastname
    validatePage.fillGender(); //
    validatePage.fillNumber("9876543210");
    validatePage.clickSubmit();
    validatePage.assertionText();
    validatePage.closeModal();
  });
  
  it("TC104: should validate if primary fields are highlighted while submitting empty form", () => {
    cy.get("#submit").click(); //to click submit button
    cy.get("#firstName").should("have.css", "border-color", "rgb(220, 53, 69)");
    cy.get("#lastName").should("have.css", "border-color", "rgb(220, 53, 69)");
    cy.get("#userNumber").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
    cy.contains("label", "Male").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
    cy.contains("label", "Female").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
    cy.contains("label", "Other").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
  it("TC105: to validate if multiple gender can be selected", () => {
    cy.contains("label", "Male").click(); //select male gender
    cy.contains("label", "Female").click(); // select female gender
    cy.get("#gender-radio-1").should("be.disabled"); //assert if male is disabled
  });
  it("TC110: to validate if city field is active when state is selected", () => {
    cy.get("#city").should("have.css", "pointer-events", "none"); //assert if city is disabled
    cy.get("#state").type("NCR{enter}"); //choose a state
    cy.get("#city").should("not.have.css", "pointer-events", "none"); // assert if city is now enabled
  });
});
