import path from 'path';
import {fileURLToPath} from 'url';
import {git} from "../../helpers/cliInteractions.mjs";
import {getVisionConfig} from "../../helpers/configPaths.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Calculate the path to the 'stubs' directory directly within helper
const stubsPath = path.join(__dirname, '../../stubs');

export default async function copyStubs(projectName) {
    console.log('Scaffolding...');

    const config = getVisionConfig()
    const projectPathOnWindows = path.join(config.projectMapping.map, config.projectSubPath, projectName).replace(/\\/g, '/');

    // Your existing approach to determine the source directory
    const src = path.join(__dirname, '..', '..', '..', 'stubs');
    // Start the copying process
    this.copyDirectoryRecursive(src, projectPathOnWindows);

    // Git commands remain unchanged
    git('add .', projectPathOnWindows);
    git('commit -m "chore: scaffold"', projectPathOnWindows);
}
