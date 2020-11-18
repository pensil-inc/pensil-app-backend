const AnswerResource = require('./poll-answer-resource');
const Resource = require('./resource');

module.exports = class AssignmentListResource extends Resource {

    format(resource) {
        return {
            id: resource._id,
            title: resource.title,
            duration: resource.duration,
            owner: resource.owner,
            questions: resource.questions ? resource.questions.length : 0,
            created_at: resource.created_at
        };
    }

}