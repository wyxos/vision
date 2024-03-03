import path from "path";
import {getProjectPath} from "./cliInteractions.mjs";
import os from "os";
import {readJsonFile} from "./jsonUtils.mjs";

export function getRuncloudConfigPath() {
    return path.join(getProjectPath(), '.runcloud.json')
}

export function getVisionConfigPath() {
    return path.join(os.homedir(), '.vision', 'config.json')
}

export function getRuncloudConfig() {
    return readJsonFile(getRuncloudConfigPath())
}

export function getVisionConfig() {
    return readJsonFile(getVisionConfigPath())
}
