import * as github from "@actions/github";
import * as core from "@actions/core";
import { exec } from "@actions/exec";

export const execWithErrorMessage = async (
  command: string,
  message: string,
) => {
  if ((await exec(command, null, { ignoreReturnCode: true })) > 0) {
    core.setFailed(message);
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
