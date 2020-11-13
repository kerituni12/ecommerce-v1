const { chai, server } = require("./testConfig");
const ProductModel = require("../models/ProductModel");
//no no
/**
 * Test cases to test all the product APIs
 * Covered Routes:
 * (1) Login
 * (2) Store product
 * (3) Get all products
 * (4) Get single product
 * (5) Update product
 * (6) Delete product
 */

describe("Product", () => {
  //Before each test we empty the database
  before((done) => {
    // eslint-disable-next-line no-unused-vars
    ProductModel.deleteMany({}, (err) => {
      done();
    });
  });

  // Prepare data for testing
  const userTestData = {
    password: "Test@123",
    email: "maitraysuthar@test12345.com",
  };

  // Prepare data for testing
  const testData = {
    title: "testing product",
    description: "testing product desc",
    isbn: "3214htrff4",
  };

  /*
   * Test the /POST route
   */
  describe("/POST Login", () => {
    it("it should do user Login for product", (done) => {
      chai
        .request(server)
        .post("/api/auth/login")
        .send({ email: userTestData.email, password: userTestData.password })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Login Success.");
          userTestData.token = res.body.data.token;
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST Product Store", () => {
    it("It should send validation error for store product", (done) => {
      chai
        .request(server)
        .post("/api/product")
        .send()
        .set("Authorization", "Bearer " + userTestData.token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST Product Store", () => {
    it("It should store product", (done) => {
      chai
        .request(server)
        .post("/api/product")
        .send(testData)
        .set("Authorization", "Bearer " + userTestData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Product add Success.");
          done();
        });
    });
  });

  /*
   * Test the /GET route
   */
  describe("/GET All product", () => {
    it("it should GET all the products", (done) => {
      chai
        .request(server)
        .get("/api/product")
        .set("Authorization", "Bearer " + userTestData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation success");
          testData._id = res.body.data[0]._id;
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe("/GET/:id product", () => {
    it("it should GET the products", (done) => {
      chai
        .request(server)
        .get("/api/product/" + testData._id)
        .set("Authorization", "Bearer " + userTestData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation success");
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe("/PUT/:id product", () => {
    it("it should PUT the products", (done) => {
      chai
        .request(server)
        .put("/api/product/" + testData._id)
        .send(testData)
        .set("Authorization", "Bearer " + userTestData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Product update Success.");
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id product", () => {
    it("it should DELETE the products", (done) => {
      chai
        .request(server)
        .delete("/api/product/" + testData._id)
        .set("Authorization", "Bearer " + userTestData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Product delete Success.");
          done();
        });
    });
  });
});
