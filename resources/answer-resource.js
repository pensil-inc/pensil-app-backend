const Resource = require('./resource');

module.exports = class AnswerResource extends Resource {

    format(resource) {
        return {
            id: resource._id,
            student: {
                id: resource.student._id,
                name: resource.student.name
            },
            option: resource.option,
        };
    }

}