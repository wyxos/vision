import fs from 'fs';
import path from 'path';
import Command from "../Command.mjs";

export default class MakeCommand extends Command {
    signature = "make:command {commandName}";

    description = "Generate a new command file";

    handle(commandName) {
        // Check if commandName argument is provided
        if (!commandName) {
            console.log("Command name argument is required.");
            return;
        }

        // Generate command signature from commandName
        const commandSignature = this.generateSignature(commandName);

        // Default description
        const description = "A sample description of the command.";

        // Define the path and content for the new command file
        const commandFileName = `${commandName}.mjs`;
        const commandFilePath = path.join(process.cwd(), 'src', 'commands', commandFileName);
        const commandContent = `import Command from "../Command.mjs";

export default class ${commandName} extends Command {
    signature = "${commandSignature}";
    description = "${description}";

    handle() {
        // Command logic here
    }
}
`;

        // Ensure the commands directory exists
        const commandsDirPath = path.dirname(commandFilePath);
        if (!fs.existsSync(commandsDirPath)) {
            fs.mkdirSync(commandsDirPath, {recursive: true});
        }

        // Write the new command file
        fs.writeFileSync(commandFilePath, commandContent);
        console.log(`Created new command at ${commandFilePath}`);
    }

    generateSignature(commandName) {
        // Convert CamelCase commandName to snake_case for the signature
        const signature = commandName.replace(/\.?([A-Z]+)/g, (x, y) => ":" + y.toLowerCase()).replace(/^:/, "");
        return signature;
    }
}
