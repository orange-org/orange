import * as github from "@actions/github";
import { getTagName, isSemVer } from "./utils";

export const getAppVersion = () => {
  const tag = getTagName();

  if (isSemVer(tag)) {
    return tag;
  }

  return `0.0.0-${github.context.sha.substr(0, 10)}`;
};
