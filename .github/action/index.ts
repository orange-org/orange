import * as core from "@actions/core";
import { exec } from "@actions/exec";
import * as github from "@actions/github";
import * as bluebird from "bluebird";

const execWithErrorMessage = async (command: string, message: string) => {
  if ((await exec(command, null, { ignoreReturnCode: true })) > 0) {
    core.setFailed(message);
  }
};

async function run() {
  // await execWithErrorMessage("npm ci", "`npm ci` failed");

  const command = core.getInput("commandz");
  const ref = core.getInput("ref");

  console.log("ref", ref);

  if (command) {
    return await execWithErrorMessage(command, `\`${command}\` failed!`);
  }

  // const task = core.getInput("task");

  // if (task === "create-packages") {
  //   return await createPackages();
  // }
}

bluebird.try(run).catch(core.debug);
