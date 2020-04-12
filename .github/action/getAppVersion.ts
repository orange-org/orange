import * as github from "@actions/github";
import { getTagName, isSemVer } from "./utils";
import { isOnGithubActions } from "./isOnGithubActions";

export const getAppVersion = () => {
  if (isOnGithubActions) {
    const tag = getTagName();

    if (isSemVer(tag)) {
      return tag;
    }

    return `0.0.0-build.${github.context.sha.substr(0, 7)}`;
  } else {
    return "0.0.0-localbuild.1";
  }
};
