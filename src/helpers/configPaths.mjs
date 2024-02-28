import path from "path";
import {getProjectPath} from "./cliInteractions.mjs";

export function getRuncloudConfigPath() {
    return path.join(getProjectPath(), '.runcloud.json')
}

export function getGitignorePath() {
    return path.join(getProjectPath(), '.gitignore')
}
