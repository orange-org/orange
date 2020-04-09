import * as core from "@actions/core";
import { exec } from "@actions/exec";
import * as bluebird from "bluebird";

const execWithErrorMessage = async (command: string, message: string) => {
  if ((await exec(command, null, { ignoreReturnCode: true })) > 0) {
    core.setFailed(message);
  }
};

async function run() {
  await execWithErrorMessage("npm ci", "`npm ci` failed");

  const command = core.getInput("command", { required: true });

  await execWithErrorMessage(command, `\`${command}\` failed!`);
}

bluebird.try(run).catch(core.debug);
