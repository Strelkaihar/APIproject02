import { postBody, putBody, patchUpdate, patchBody } from "../fixtures/testData.json";

describe("API Project02", () => {
  beforeEach(function () {
    cy.fixture("testData").then((data) => {
      this.firstName = data.postBody.firstName;
      this.lastName = data.postBody.lastName;
      this.email = data.postBody.email;
      this.dob = data.postBody.dob;

      this.firstNameU = data.putBody.firstName;
      this.lastNameU = data.putBody.lastName;
      this.emailU = data.putBody.email;
      this.dobU = data.putBody.dob;
    });
  });
  let userId;
  let durTime = 500;

  it("01 Retrieve a list of all users.", function () {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.lessThan(durTime);
      expect(response.body.length).to.greaterThan(1);
      expect(response.body[1].firstName).to.equal("John");
      expect(response.body[1].lastName).to.equal("Doe");
    });
  });
  it("02 Create a new user", function () {
    cy.request({
      method: "POST",
      url: Cypress.env("baseUrl"),
      body: postBody,
    }).then((response) => {
      userId = response.body.id;

      cy.validateResponse(response, postBody);
      expect(response.status).to.equal(200);
      expect(response.duration).to.lessThan(durTime);
    });
  });
  it("03 Retrieve a specific user-created", function () {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}/${userId}`,
    }).then((response) => {
      cy.validateResponse(response, postBody);
      expect(response.status).to.equal(200);
      expect(response.duration).to.lessThan(durTime);
    });
  });
  it("04 Update an existing user", function () {
    cy.request({
      method: "PUT",
      url: `${Cypress.env("baseUrl")}/${userId}`,
      body: putBody,
    }).then((response) => {
      cy.validateResponse(response, putBody);
      expect(response.status).to.equal(200);
      expect(response.duration).to.lessThan(durTime);
    });
  });
  it("05 Partially update an existing User", function () {
    cy.request({
      method: "PATCH",
      url: `${Cypress.env("baseUrl")}/${userId}`,
      body: patchUpdate,
    }).then((response) => {
      cy.validateResponse(response, patchUpdate);
      expect(response.status).to.equal(200);
      expect(response.duration).to.lessThan(durTime);
    });
  });
  it("06 Retrieve a list of all users.", function () {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.lessThan(durTime);
      expect(response.body.length).to.greaterThan(2);
    });
  });
  it("07 Retrieve a specific user created to confirm the update.", function () {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}/${userId}`,
    }).then((response) => {
      cy.validateResponse(response, patchBody);
      expect(response.status).to.equal(200);
      expect(response.duration).to.lessThan(durTime);
    });
  });
  it("08 Finally, delete the user that you created.", () => {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("baseUrl")}/${userId}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.lessThan(durTime)
    });
  });
});
