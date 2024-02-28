// cliInteractions.mjs
import readline from 'readline';
import path from "path";

/**
 * Creates a readline interface.
 * @returns {readline.Interface}
 */
function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

/**
 * Asks a question and gets user input.
 * @param {String} question - The question to prompt the user.
 * @returns {Promise<String>} - The user's input.
 */
export function askQuestion(question) {
    const rl = createReadlineInterface();
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

export function getProjectPath() {
    return process.cwd()
}

export function getProjectName() {
    return path.basename(getProjectPath());
}
