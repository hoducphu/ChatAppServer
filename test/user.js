const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach((done) => {
    done();
  });

  describe("/POST users", () => {
    // it("Should create new user", (done) => {
    //   let user = {
    //     email: "example1",
    //     password: "123123",
    //     fullname: "Ho Duc Phu",
    //     phonenumber: "0203094032",
    //   };
    //   chai
    //     .request(server)
    //     .post("/api/user/")
    //     .send(user)
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       res.body.should.be.a("object");
    //       res.body.should.have.property("_id");
    //       res.body.should.have.property("email").eql(user.email);
    //       res.body.should.have.property("fullname").eql(user.fullname);
    //       res.body.should.have.property("phonenumber").eql(user.phonenumber);
    //       done();
    //     });
    // });

    it("Should login", (done) => {
      let input = {
        email: "example",
        password: "123123",
      };

      chai
        .request(server)
        .post("/api/user/login")
        .send(input)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("email");
          res.body.should.have.property("fullname");
          res.body.should.have.property("phonenumber");
          res.body.should.have.property("token");
          done();
        });
    });
  });
});
