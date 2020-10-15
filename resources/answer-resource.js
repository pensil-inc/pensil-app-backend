const Resource = require('./resource');

module.exports = class AnswerResource extends Resource {

    format(resource) {
        return {
            studentId: resource.student._id,
            option: resource.option,
        };
    }

}