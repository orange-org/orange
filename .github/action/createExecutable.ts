/* eslint-disable no-console */
import * as core from "@actions/core";
import * as artifact from "@actions/artifact";
import fs from "fs-extra";
import * as packager from "electron-packager";
import * as archiver from "archiver";
import { basename } from "path";
import { getAppVersion } from "./getAppVersion";
import { execWithErrorMessage } from "./utils";

const artifactClient = artifact.create();
const appVersion = getAppVersion();
const electronPackagerArtifactDir = "artifacts/electronPackager";

export const platformDefinitions = {
  "macos-latest": {
    electronPackagerPlatform: "darwin",
    archiveName: `Orange-v${appVersion}-macOS.zip`,
  },
  "ubuntu-latest": {
    electronPackagerPlatform: "linux",
    archiveName: `Orange-v${appVersion}-Linux.zip`,
  },
  "windows-latest": {
    electronPackagerPlatform: "win32",
    archiveName: `Orange-v${appVersion}-Windows.zip`,
  },
};

export const createExecutable = async () => {
  console.log("Building source code...");
  await execWithErrorMessage("npm run build", "`npm run build` failed");

  const os = core.getInput("os", { required: true });
  const { archiveName, electronPackagerPlatform } = platformDefinitions[os];

  console.log(`Creating Electron package on ${os}...`);
  await packager({
    arch: "x64",
    dir: "artifacts/webpack",
    out: electronPackagerArtifactDir,
    icon: "src/assets/orange",
    overwrite: true,
    platform: electronPackagerPlatform,
    prune: false,
    appVersion: getAppVersion(),
  });

  console.log("Compressing Electron package...");
  await new Promise(resolve_ => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const output = fs.createWriteStream(
      `${electronPackagerArtifactDir}/${archiveName}`,
    );
    archive.pipe(output);
    archive.directory(
      `${electronPackagerArtifactDir}/Orange-${electronPackagerPlatform}-x64/`,
      false,
    );
    output.on("close", resolve_);
    archive.on("error", error => {
      console.error(error);
      core.setFailed(`Could not create a zip archive on ${os}`);
    });
    archive.finalize();
  });

  console.log(`Uploading ${archiveName}...`);
  try {
    await artifactClient.uploadArtifact(
      basename(archiveName),
      [`${electronPackagerArtifactDir}/${archiveName}`],
      electronPackagerArtifactDir,
    );
  } catch (e) {
    console.error(e);
    core.setFailed(`Could not upload ${archiveName}`);
  }
};
