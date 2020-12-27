const PollAnswerResource = require('./poll-answer-resource');
const Resource = require('./resource');
const moment = require('moment');

module.exports = class PollResource extends Resource {

    format(resource) {

        // get poll answers
        const answers = resource.answers.map(answer => answer.option);

        // get poll options
        const { options } = resource;

        // initialize a every option percentage to 0
        const votes = {};
        for (const option of options) {
            votes[option] = 0;
        }

        // get total answers there are
        const totalAnswers = answers.length;

        // for each answer increase the option count
        for (const answer of answers) {
            votes[answer]++;
        }

        // convert the votes to ratio
        for (const option of options) {
            if (votes[option] > 0) {
                votes[option] /= totalAnswers;
            } else {
                votes[option] = 0;
            }
        }



        return {
            id: resource._id,
            question: resource.question,
            options: resource.options,
            endTime: resource.endTime,
            isExpired: resource.isExpired ? resource.isExpired : moment(resource.endTime).isBefore(moment()) ? true : false,
            batches: resource.batches,
            isForAll: true,
            answers: new PollAnswerResource(resource.answers),
            totalVotes: totalAnswers,
            votes,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt
        };
    }

}