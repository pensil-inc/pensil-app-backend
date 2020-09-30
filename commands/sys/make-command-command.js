const chalk = require("chalk")
const path = require('path')
const { promises: fs } = require('fs');
const replicator = require("./lib/replicator");

const MakeCommandCommand = {
    // Command signature
    signature: "make:command",
    // Command description
    description: "This command creates commands. LOL.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if command name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [commandName] = args;
        // get command dir path
        const commandDir = path.join(dirname, 'commands');
        // generate filename
        const filename = path.join(commandDir, commandName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // get template content
        const templateFile = path.join(__dirname, 'templates', 'command.jstemplate');

        return await replicator(commandDir, filename, templateFile, "Command", content => {
            return content.replace(/__COMMAND_NAME__/g, commandName);
        });
    }
};

module.exports = MakeCommandCommand;