import * as core from "@actions/core";
import bluebird from "bluebird";
import { execWithErrorMessage } from "./utils";
import { draftRelease } from "./draftRelease";

const action = async () => {
  const command = core.getInput("command");

  if (command) {
    return await execWithErrorMessage(command, `\`${command}\` failed!`);
  }

  const task = core.getInput("task");

  if (task === "draft-release") {
    return await draftRelease();
  }
};

bluebird.try(action).catch(error => core.setFailed(error.toString()));
