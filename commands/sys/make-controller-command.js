const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');
const replicator = require("./lib/replicator");

const MakeController = {
    // Command signature
    signature: "make:controller",
    // Command description
    description: "This command creates a new controller.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if controller name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [controllerName] = args;
        // get controllers dir path
        const controllerDir = path.join(dirname, 'controllers');
        // generate filename
        const filename = path.join(controllerDir, controllerName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // get template content
        const templateFile = path.join(__dirname, 'templates', 'controller.jstemplate');

        return await replicator(controllerDir, filename, templateFile, "Controller", content => {
            return content.replace(/__CONTROLLER_NAME__/g, controllerName);
        });
    }
};

module.exports = MakeController;