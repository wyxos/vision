import fs from "fs";
import {getGitignorePath} from "./configPaths.mjs";

export function appendGitIgnore(entry) {
    if (fs.existsSync(getGitignorePath())) {
        const gitignoreContent = fs.readFileSync(getGitignorePath(), 'utf8');
        if (!gitignoreContent.includes(`${entry}`)) {
            // Append ${entry} to .gitignore
            fs.appendFileSync(getGitignorePath(), `
${entry}
`);
            console.log(`${entry} has been added to .gitignore.`);
        }
    } else {
        // Create .gitignore and add ${entry}
        fs.writeFileSync(getGitignorePath(), `${entry}
`);
        console.log(`.gitignore created and ${entry} added.`);
    }
}
