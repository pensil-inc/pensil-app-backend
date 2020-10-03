const User = require("../models/user");
const StudentListResource = require("../resources/student-list-resource");

module.exports = class StudentController {
    static async list(req, res) {
        const students = await User.find({ role: "student" });

        return res.json({
            students: new StudentListResource(students)
        });
    }

    static create(req, res) { }

    static update(req, res) { }

    static delete(req, res) { }
};
