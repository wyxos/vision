#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { execSync } from "child_process";
import inquirer from "inquirer";
import Toggle from "./commands/Toggle.mjs";
import MakeRoute from "./commands/MakeRoute.mjs";
// ... other imports

program.version("0.0.1");

program
  .command("toggle")
  .description("Toggle package between local and online versions")
  .action(Toggle);

program
  .command("make:route")
  .description("Create a new Vue route")
  .action(MakeRoute);

program.parse(process.argv);