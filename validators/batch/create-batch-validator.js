const Validator = require('../validator');

class CreateBatchValidator extends Validator {

    constructor(data = {}, rules = {}, messages = {}) {
        /**
         * Define You rules here
         */
        rules = {
            name: "required|string",
            description: "required|string",
            subject: "string",
            classes: "array|required",
            "classes.*.dayOfWeek": "required|integer|min:1|max:7",
            "classes.*.startTime": 'required|string|min:5|max:5',
            "classes.*.endTime": 'required|string|min:5|max:5',
            students: "array|required",
            "students.*": "required|digit:10"
        };

        super(data, rules, messages);
    }

    /**
     * 
     * Static function that validates a incoming request as a middleware
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.Next} next 
     */
    static middleware(req, res, next) {
        const validator = new CreateBatchValidator(req.body);
        // check if data is valid
        if (validator.fails()) {
            // return error in case data invalid
            return res.status(422).json(validator.errors());
        } else {
            // set validated values a req.body
            req.body = { ...validator.validated };
            // continue with next middleware
            next();
        }
    }

}

module.exports = CreateBatchValidator;