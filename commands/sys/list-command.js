const chalk = require("chalk");
const Commander = require('../../config/commander');
const Table = require('cli-table3');

const VersionCommand = {
    // Command signature
    signature: "list",
    // Command description
    description: "Get list of all available commands.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {

        const commander = new Commander()
        await commander.init(__dirname);

        const table = new Table({
            head: ['Signature', 'Description'],
            colWidths: [40, 80]
        })
        for (const signature in commander.commands) {
            table.push([chalk.green(signature), chalk.white(commander.commands[signature].description)]);
        }
        console.log(table.toString());
    }
};

module.exports = VersionCommand;