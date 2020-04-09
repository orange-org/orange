import * as core from "@actions/core";
import { exec } from "@actions/exec";
import * as github from "@actions/github";
import * as bluebird from "bluebird";

import { execWithErrorMessage } from "./utils";
import { buildPackage } from "./buildPackage";

async function run() {
  await execWithErrorMessage("npm ci", "`npm ci` failed");

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
