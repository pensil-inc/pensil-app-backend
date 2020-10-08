const AnswerResource = require('./answer-resource');
const Resource = require('./resource');

module.exports = class PollResource extends Resource {

    format(resource) {
        return {
            id: resource._id,
            question: resource.question,
            options: resource.options,
            endTime: resource.endTime,
            batches: resource.batches,
            isForAll: true,
            answers: new AnswerResource(resource.answers),
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt
        };
    }

}