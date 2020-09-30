const chalk = require("chalk");
const app = require('../../config/app');

const HelpCommand = {
    // Command signature
    signature: "help",
    // Command description
    description: "Get help related to Framework.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        console.log(chalk.white("This utility will provide you with a variety of commandline tools to make your work easy."));
        console.log(chalk.white("Try ") + chalk.green("node spark list") + chalk.white(" to get all available commands."));
        console.log(chalk.white("Try ") + chalk.green("node spark version") + chalk.white(" to know which version of spark are you using."));
    }
};

module.exports = HelpCommand;