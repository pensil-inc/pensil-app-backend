const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');
const replicator = require("./lib/replicator");

const MakeMiddleware = {
    // Command signature
    signature: "make:middleware",
    // Command description
    description: "This command creates a new request middleware.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if controller name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [middlewareName] = args;
        // get controllers dir path
        const middlewareDir = path.join(dirname, 'middlewares');
        // generate filename
        const filename = path.join(middlewareDir, middlewareName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // get template content
        const templateFile = path.join(__dirname, 'templates', 'middleware.jstemplate');

        return await replicator(middlewareDir, filename, templateFile, "Middleware", content => {
            return content.replace(/__MIDDLEWARE_NAME__/g, middlewareName);
        });
    }
};

module.exports = MakeMiddleware;