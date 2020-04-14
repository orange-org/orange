import * as github from "@actions/github";
import * as core from "@actions/core";
import { exec } from "@actions/exec";
import shelljs from "shelljs";
import { isOnGithubActions } from "./isOnGithubActions";

export const execWithErrorMessage = async (
  command: string,
  message: string,
) => {
  if (isOnGithubActions) {
    if ((await exec(command, null, { ignoreReturnCode: true })) > 0) {
      core.setFailed(message);
    }
  } else {
    if (shelljs.exec(command).code > 0) {
      shelljs.exit(1);
    }
  }
};

export const getTagName = () => {
  const ref = github.context.ref;
  const tagPath = "refs/tags/";

  return ref.substr(tagPath.length, ref.length);
};

const semVerTagRegExp = /^([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
export const isSemVer = (s: string) => {
  return semVerTagRegExp.test(s);
};
