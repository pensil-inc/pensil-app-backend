const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const Batch = require('../models/batch');
const user = require('../models/user');
const TestHelper = require('./test-helper');
const should = chai.should();

chai.use(chaiHttp);

describe("Teacher Batch CRUD", function () {

    before(async () => {
        return new Promise(async resolve => {
            // delete all users
            await user.deleteMany({});
            // create or update user
            await user.updateOne({
                name: "Shubham",
                mobile: 8218578499,
                password: "password",
                role: "student"
            }, {
                name: "Shubham",
                mobile: 8218578499,
                password: "password",
                role: "student"
            }, {
                upsert: true
            })

            // delete all the batches
            Batch.deleteMany({});

            return resolve();
        });
    });

    describe("POST: /batch", () => {
        it("Teacher is able to create batch", async () => {
            return new Promise(async resolve => {
                const requestBody = {
                    name: "Test Batch 2",
                    description: "This is some description",
                    classes: [
                        {
                            "dayOfWeek": 1,
                            "startTime": "22:00",
                            "endTime": "24:00"
                        }
                    ],
                    subject: "Hindi",
                    students: [
                        7017958027,
                        9897337722
                    ]
                };

                const token = await TestHelper.getTokenUsingMobileNumber(8218578499);

                chai.request(server)
                    .post('/api/batch')
                    .set(
                        'Authorization',
                        'Bearer ' + token)
                    .send(requestBody)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('batch');
                        res.body.batch.should.have.property('id');
                        res.body.batch.classes.should.have.length(1);
                        res.body.batch.students.should.have.length(2);
                        return resolve();
                    });
            })
        });
    });

    describe("POST: /batch/:id", () => {
        it("Teacher is able to edit batch", async () => {
            return new Promise(async resolve => {
                const requestBody = {
                    name: "Test Batch 2",
                    description: "This is some description",
                    classes: [
                        {
                            "dayOfWeek": 1,
                            "startTime": "22:00",
                            "endTime": "24:00"
                        }
                    ],
                    subject: "Hindi",
                    students: [
                        7017958027
                    ]
                };

                const token = await TestHelper.getTokenUsingMobileNumber(8218578499);

                chai.request(server)
                    .post('/api/batch')
                    .set(
                        'Authorization',
                        'Bearer ' + token)
                    .send(requestBody)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('batch');
                        res.body.batch.should.have.property('id');
                        res.body.batch.subject = "Hindi";
                        res.body.batch.students.should.have.length(1);
                        return resolve();
                    });
            })
        });
    });
});