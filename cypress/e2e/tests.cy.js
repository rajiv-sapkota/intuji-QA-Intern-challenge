///<reference types="cypress" />;

describe("Test cases for student registration form DEMOQA", () => {
  beforeEach(() => {
    // Runs before every test
    cy.accessBaseUrl();
  });
  it("TC101: validate form submission with valid ", () => {
    cy.get("#firstName").type("Rajiv"); //enter first name
    cy.get("#lastName").type("Sapkota"); //enter lastname
    cy.get("#userEmail").type("sapkota.rajiv96@gmail.com"); //enter email

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
  it("TC102: should validate if form can be validated with only required fields", () => {
    cy.get("#firstName").type("Rajiv"); //enter first name
    cy.get("#lastName").type("Sapkota"); //enter lastname
    cy.contains("label", "Male").click(); //select male gender
    cy.get("#userNumber").type("9843530325"); //enter phone number
    cy.get("#submit").click(); //to click submit button
    cy.get("#example-modal-sizes-title-lg") //form submission assertion
      .should("be.visible")
      .should("have.text", "Thanks for submitting the form");

    cy.get("#closeLargeModal").scrollIntoView(); //closing the menu
    cy.get("#closeLargeModal").click({ force: true });
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
  it.only("TC110: to validate if city field is active when state is selected", () => {
    cy.get("#city").should("have.css", "pointer-events", "none"); //assert if city is disabled
    cy.get("#state").type("NCR{enter}"); //choose a state
    cy.get("#city").should("not.have.css", "pointer-events", "none"); // assert if city is now enabled
  });
});
