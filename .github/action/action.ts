import * as core from "@actions/core";
import * as bluebird from "bluebird";
import { buildPackage } from "./buildPackage";
import { execWithErrorMessage } from "./utils";

async function run() {
  const command = core.getInput("command");

  if (command) {
    return await execWithErrorMessage(command, `\`${command}\` failed!`);
  }

  const task = core.getInput("task");

  if (task === "build-packages") {
    return await buildPackage();
  }
}

bluebird.try(run).catch(core.debug);
