const Resource = require('./resource');

module.exports = class PollAnswerResource extends Resource {

    format(resource) {
        return {
            studentId: resource.student._id,
            option: resource.option,
        };
    }

}