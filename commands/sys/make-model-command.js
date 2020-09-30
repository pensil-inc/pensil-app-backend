const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');
const replicator = require("./lib/replicator");

const MakeModel = {
    // Command signature
    signature: "make:model",
    // Command description
    description: "This command creates a new mongodb model.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if controller name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [modelName] = args;
        // get controllers dir path
        const modelDir = path.join(dirname, 'models');
        // generate filename
        const filename = path.join(modelDir, modelName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // get template content
        const templateFile = path.join(__dirname, 'templates', 'model.jstemplate');

        return await replicator(modelDir, filename, templateFile, "Model", content => {
            return content.replace(/__MODEL_NAME__/g, modelName);
        });
    }
};

module.exports = MakeModel;