const path = require('path');
const { promises: fs } = require('fs');
const { dirname } = require('path');

class Commander {

    // List of dirs to load commands from (relative from commands directory)
    sources = [
        '.', // commands directory itself, will host user created command
        'sys', // the commands included in the system
    ];

    // This will hold all the commands
    commands = {};

    async init(dirname) {

        // for each source 
        for (const source of this.sources) {
            // scan the source for commands
            const sourcePath = path.join('commands', source);
            // get content of source 
            const sourceContents = await fs.readdir(sourcePath);
            // for each source dir content
            for (const content of sourceContents) {
                // check if a command file
                const contentPath = path.join(sourcePath, content);
                if ((await fs.lstat(contentPath)).isFile()) {
                    // if ends with '-command.js'
                    if (contentPath.endsWith('-command.js')) {
                        // require the file in
                        const newCommand = require(path.join('..', contentPath));
                        // TODO: convert the command structure to class base for easy validation
                        // check if there is signature available
                        if (newCommand.hasOwnProperty('signature') && newCommand.hasOwnProperty('handle')) {
                            // add command to commander
                            this.commands[newCommand.signature] = newCommand;
                        }
                    }
                }
            };
        };
    }
};

module.exports = Commander;