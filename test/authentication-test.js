process.env.NODE_ENV = "test";

const assert = require('assert');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const user = require('../models/user');
const should = chai.should();

chai.use(chaiHttp);

describe("Authentication", function () {

    before(done => {
        user.deleteMany({}).then(() => { done(); });
    });

    describe("POST: /register", function () {

        it("Should allow registration from mobile", done => {
            chai.request(server).post('/api/register')
                .send({
                    name: "Shubham",
                    mobile: 8218578499,
                    password: "password"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    // update the user, activate him
                    done();
                });
        });

        it("Should allow registration from email", done => {
            chai.request(server).post('/api/register')
                .send({
                    name: "Shubham",
                    email: "shubham@gmail.com",
                    password: "password"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    // update the user, activate him
                    done();
                });
        });

    });

    describe("POST: /login", function () {
        before(done => {
            // activate the user
            Promise.all([
                user.updateOne({ mobile: 8218578499 }, { isVerified: true }),
                user.updateOne({ email: "shubham@gmail.com" }, { isVerified: true }),
            ])
                .then(() => {
                    done();
                });
        })

        it("Should deny incorrect credentials", done => {
            chai.request(server).post('/api/login')
                .send({ mobile: 8218578499, password: "notpassword" })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.property('errors');
                    done();
                });
        });

        it("Should let the correct user log in [mobile]", done => {
            chai.request(server).post('/api/login')
                .send({ mobile: 8218578499, password: "password" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("user");
                    res.body.user.should.have.property("token");
                    done();
                });
        });

        it("Should let the correct user log in [email]", done => {
            chai.request(server).post('/api/login')
                .send({ email: "shubham@gmail.com", password: "password" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("user");
                    res.body.user.should.have.property("token");
                    done();
                });
        });

    });
});