#!/usr/bin/env node

import { program } from "commander";
import Toggle from "./commands/Toggle.mjs";
import MakeRoute from "./commands/MakeRoute.mjs";
import ToggleHarmonie from "./commands/ToggleHarmonie.mjs";

program.version("0.0.1");

program
  .command("toggle")
  .description("Toggle wyxos/vision package between local and online versions")
  .action(Toggle);

program
    .command("toggle:harmonie")
    .description("Toggle wyxos/harmonie vendor between local and online versions")
    .action(ToggleHarmonie);

program
  .command("make:route")
  .description("Create a new Vue route")
  .action(MakeRoute);

program.parse(process.argv);