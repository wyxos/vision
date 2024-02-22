#!/usr/bin/env node

import {program} from "commander";
import fs from "fs";
import path from "path";
import {fileURLToPath, pathToFileURL} from 'url';

async function setupProgram() {
    program.version("0.0.1");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const dirPath = path.join(__dirname, 'commands');

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        if (path.extname(file) === '.mjs') {
            const filePath = path.join(dirPath, file);
            const fileURL = pathToFileURL(filePath).href;

            const module = await import(fileURL);
            const Module = module.default;

            const instance = new Module();

            program
                .command(instance.signature)
                .description(instance.description)
                .action((...args) => {
                    const options = args.pop();
                    instance.handle(...args);
                });
        }
    }

    program.parse(process.argv);
}

setupProgram().catch(err => console.error(err));
