class ValidatePage {
  fillFirstName(firstName) {
    cy.get("#firstName").type(firstName); //enter first name
  }
  fillLastName(lastName) {
    cy.get("#lastName").type(lastName); //enter lastname
  }
  fillGender() {
    cy.contains("label", "Male").click(); //select male gender
  }
  fillNumber(phoneNumber) {
    cy.get("#userNumber").type(phoneNumber); //enter phone number
  }
  clickSubmit() {
    cy.get("#submit").click(); //to click submit button
  }
  assertionText() {
    cy.get("#example-modal-sizes-title-lg") //form submission assertion
      .should("be.visible")
      .should("have.text", "Thanks for submitting the form");
    }
    closeModal() {
        cy.get("#closeLargeModal").scrollIntoView(); //closing the menu
        cy.get("#closeLargeModal").click({ force: true });
    }
}
export default ValidatePage;
