const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');

async function replicator(destinationpath, filepath, templatepath, entity, contentModifier) {
    try {
        const stats = await fs.stat(filepath);
        console.log(chalk.red(entity + " with similiar name exists"));
        return 0
    } catch (error) {
        // get template content
        const templateContent = contentModifier(await fs.readFile(templatepath, { encoding: "utf-8" }));
        // make changes
        await fs.writeFile(filepath, templateContent);
        console.log(chalk.green(entity + " created successfully."));
        return 1;
    }
}

module.exports = replicator;