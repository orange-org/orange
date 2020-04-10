import * as core from "@actions/core";
import * as artifact from "@actions/artifact";
import { GitHub, context } from "@actions/github";
import { getAppVersion } from "./getAppVersion";
import { isSemVer } from "./utils";

export const draftRelease = async () => {
  try {
    const github = new GitHub(process.env.GITHUB_TOKEN);
    const { owner, repo } = context.repo;
    const appVersion = getAppVersion();

    // if (!isSemVer(appVersion)) {
    //   core.setFailed(`Version ${appVersion} is not a valid semantic version.`);
    //   return;
    // }

    console.log("Creating GitHub release");
    const createReleaseResponse = await github.repos.createRelease({
      owner,
      repo,
      tag_name: appVersion,
      name: `Orange v${appVersion}`,
      draft: true,
    });

    const {
      data: { upload_url: uploadUrl },
    } = createReleaseResponse;

    const artifactClient = artifact.create();
    const downloadResponse = await artifactClient.downloadAllArtifacts();

    console.log(downloadResponse);
    // // output result
    // for (let response in downloadResponse) {
    //   console.log(response.artifactName);
    //   console.log(response.downloadPath);
    // }
  } catch (error) {
    core.setFailed(error.message);
  }
};
