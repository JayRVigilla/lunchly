process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const db = require("./db");


beforeEach(function() {

});


describe("GET: customer", function() {
  it("Renders a page with a list of all customers", async function() {
    const resp = await request(app)
    .get(`/`);
    // console.log(resp.body);
    expect(resp.statusCode).toBe(200);
    expect(resp.text).toMatch("All Customers");
  });

  it("Renders a page with search results", async function() {
    const resp = await request(app)
    .get(`/search`)
    .send({
      searchQuery: "Jessica"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.text).toMatch("Jessica Friedman");
    expect(resp.text).not.toMatch("Anthony Gonzales");
  });

  // it("Renders a page with no search results", async function() {
  //   const resp = await request(app)
  //   .get(`/search`)
  //   .send({
  //     searchQuery: "Bob"
  //   });
  //   expect(resp.statusCode).toBe(200);
  //   expect(resp.text).toMatch("No customers found.");
  // });

});
    afterEach(async function() {
      await db.end();
    });