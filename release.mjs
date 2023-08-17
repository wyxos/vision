import chalk from "chalk";
import inquirer from "inquirer";
import { execSync } from "child_process";
import simpleGit from "simple-git";

const git = simpleGit();

const currentVersion = execSync("npm -v", { encoding: "utf-8" }).trim();

let defaultVersion = currentVersion.split(".");
defaultVersion[defaultVersion.length - 1] = Number(defaultVersion[defaultVersion.length - 1]) + 1;
defaultVersion = defaultVersion.join(".");

const { version } = await inquirer.prompt([
  {
    name: "version",
    message: `Enter the version to publish (current ${currentVersion})`,
    default: defaultVersion
  }
]);

const tagVersion = `v${version}`;
const commitMessage = `feat: release ${tagVersion}`;

const execSyncOut = (command) => {
  execSync(command, { stdio: "inherit" });
};

// Run linting
execSyncOut("npm run lint");

// Build the project
execSyncOut("npm run build");

// Update the version
execSyncOut(`npm version ${version} -m "${commitMessage}"`);

const commitFiles = async () => {
  await git.add(".");
  await git.commit(commitMessage);
};

const createTag = async () => {
  await git.tag([tagVersion, "-m", tagVersion]);
};

const pushChanges = async () => {
  await git.push("origin", "main");
  await git.pushTags("origin");
};

const release = async () => {
  try {
    await commitFiles();
    await createTag();
    await pushChanges();
    console.log(chalk.green(`Successfully released version ${version}`));
    console.log(chalk.green("Publishing to npm..."));
    execSyncOut("npm login");
    execSyncOut("npm publish");
  } catch (error) {
    console.error(chalk.red("Release process failed. Error:", error));
  }
};

release();
