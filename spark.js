const chalk = require('chalk');
const Commander = require('./config/commander');
const Table = require('cli-table3');


init();

async function init() {

    const commander = new Commander()
    await commander.init(__dirname);

    const [executor, currentFile, command, ...args] = process.argv;

    // check if command undefined
    if (command === undefined) {
        console.log(chalk.red('Provide a command!'));
        return 1;
    }

    // check if command has the command registered
    if (!commander.commands.hasOwnProperty(command)) {
        console.log(chalk.red('Command ' + command + ' not found!'));
        return 1;
    }

    // handle the command
    commander.commands[command].handle(args, __dirname); // should return 0 for failure 1 for success

    return 0;
}
