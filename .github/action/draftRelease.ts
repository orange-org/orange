import * as core from "@actions/core";
import * as artifact from "@actions/artifact";
import { GitHub, context } from "@actions/github";
import fs from "fs-extra";
import { getAppVersion } from "./getAppVersion";
import { isSemVer } from "./utils";
import { productName } from "../../package.json";

export const draftRelease = async () => {
  const github = new GitHub(core.getInput("githubToken"));
  const { owner, repo } = context.repo;
  const appVersion = getAppVersion();

  if (!isSemVer(appVersion)) {
    core.setFailed(`Version ${appVersion} is not a valid semantic version.`);
    return;
  }

  console.log("Creating GitHub release...");
  const createReleaseResponse = await github.repos.createRelease({
    owner,
    repo,
    tag_name: appVersion,
    name: `${productName} v${appVersion}`,
    draft: true,
  });

  const {
    data: { upload_url: uploadUrl },
  } = createReleaseResponse;

  const artifactClient = artifact.create();
  console.log("Downloading build artifacts...");
  const downloadResponse = await artifactClient.downloadAllArtifacts();

  for (let response of downloadResponse) {
    const { downloadPath, artifactName } = response;
    const artifactPath = `${downloadPath}/${artifactName}`;

    console.log(`Uploading release asset ${artifactName}...`);
    await github.repos.uploadReleaseAsset({
      url: uploadUrl,
      headers: {
        "content-type": "application/zip",
        "content-length": fs.statSync(artifactPath).size,
      },
      name: artifactName,
      file: fs.readFileSync(artifactPath),
    });
  }
};
