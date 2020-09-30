const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');
const replicator = require("./lib/replicator");

const MakeValidator = {
    // Command signature
    signature: "make:validator",
    // Command description
    description: "This command creates a new request validator.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if controller name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [validatorName] = args;
        // get controllers dir path
        const validatorDir = path.join(dirname, 'validators');
        // generate filename
        const filename = path.join(validatorDir, validatorName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // get template content
        const templateFile = path.join(__dirname, 'templates', 'validator.jstemplate');

        return await replicator(validatorDir, filename, templateFile, "Validator", content => {
            return content.replace(/__VALIDATOR_NAME__/g, validatorName);
        });
    }
};

module.exports = MakeValidator;