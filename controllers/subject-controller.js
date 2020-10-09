const subject = require("../models/subject");
const Subject = require("../models/subject");
const SubjectResource = require("../resources/subject-resource");


module.exports = class SubjectController {
    static async list(req, res) {
        const subjects = await Subject.find({});

        return res.json({
            subjects: new SubjectResource(subjects)
        });
    }

};
