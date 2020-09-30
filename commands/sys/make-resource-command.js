const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');
const replicator = require("./lib/replicator");

const MakeResource = {
    // Command signature
    signature: "make:resource",
    // Command description
    description: "This command creates a new json resource.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if controller name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [resourceName] = args;
        // get controllers dir path
        const resourceDir = path.join(dirname, 'resources');
        // generate filename
        const filename = path.join(resourceDir, resourceName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // get template content
        const templateFile = path.join(__dirname, 'templates', 'resource.jstemplate');

        return await replicator(resourceDir, filename, templateFile, "Resource", content => {
            return content.replace(/__RESOURCE_NAME__/g, resourceName);
        });
    }
};

module.exports = MakeResource;