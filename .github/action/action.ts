import * as core from "@actions/core";
import * as bluebird from "bluebird";
import { build } from "./build";
import { execWithErrorMessage } from "./utils";

async function run() {
  const command = core.getInput("command");

  if (command) {
    return await execWithErrorMessage(command, `\`${command}\` failed!`);
  }

  if (core.getInput("task") === "build") {
    return await build();
  }
}

bluebird.try(run).catch(core.debug);
