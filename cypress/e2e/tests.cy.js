///<reference types="cypress" />;

describe("Test cases for student registration form DEMOQA", () => {
  beforeEach(() => {
    // Runs before every test
    cy.accessBaseUrl();
  });
  it("Positive Test: Student form is submitable using valid credentials ", () => {
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
  it("should validate if form can be validated with only required fields", () => {
    cy.get("#firstName").type("Rajiv"); //enter first name
    cy.get("#lastName").type("Sapkota"); //enter lastname
    cy.contains("label", "Male").click(); //select male gender
    cy.get("#userNumber").type("9843530325"); //enter phone number
    cy.get("#submit").click(); //to click submit button
    cy.get("#example-modal-sizes-title-lg")//form submission assertion
       .should("be.visible")
       .should("have.text", "Thanks for submitting the form");

    cy.get("#closeLargeModal").scrollIntoView();//closing the menu
    cy.get("#closeLargeModal").click({ force: true });

  })
  it.only("should validate if primary fields are highlighted while submitting empty form", () => {
    cy.get("#submit").click(); //to click submit button
    cy.get("#firstName").should("have.css", "border-color", "rgb(220, 53, 69)");
    cy.get("#lastName").should("have.css", "border-color", "rgb(220, 53, 69)");
    cy.get("#userNumber").should("have.css", "border-color", "rgb(220, 53, 69)");
    cy.contains("label", "Male").should("have.css", "border-color", "rgb(220, 53, 69)");
    cy.contains("label", "Female").should("have.css", "border-color", "rgb(220, 53, 69)");
    cy.contains("label", "Other").should("have.css","border-color","rgb(220, 53, 69)");

    
  })
  




});
