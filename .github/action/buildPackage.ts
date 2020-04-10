/* eslint-disable no-console */
import * as core from "@actions/core";
import * as artifact from "@actions/artifact";
import fs from "fs-extra";
import * as packager from "electron-packager";
import * as archiver from "archiver";
import { getAppVersion } from "./getAppVersion";
import { execWithErrorMessage } from "./utils";

const artifactClient = artifact.create();

const appVersion = getAppVersion();

const platformDefinitions = {
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

export async function buildPackage() {
  console.log("Building source code...");
  await execWithErrorMessage("npm run build", "`npm run build` failed");

  const os = core.getInput("os", { required: true });
  const platformDefinition = platformDefinitions[os];

  console.log(`Creating Electron package on ${os}...`);
  await packager({
    arch: "x64",
    dir: "artifacts/webpack",
    out: "artifacts/electronPackager",
    icon: "src/assets/orange",
    overwrite: true,
    platform: platformDefinition.electronPackagerPlatform,
    prune: false,
    appVersion: getAppVersion(),
  });

  console.log("Compressing Electron package...");
  await new Promise(resolve_ => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const output = fs.createWriteStream(
      `artifacts/electronPackager/${platformDefinition.archiveName}`,
    );
    archive.pipe(output);
    archive.directory(
      `artifacts/electronPackager/Orange-${platformDefinition.electronPackagerPlatform}-x64/`,
      false,
    );
    output.on("close", resolve_);
    archive.on("error", error => {
      console.error(error);
      core.setFailed(`Could not create a zip archive on ${os}`);
    });
    archive.finalize();
  });

  console.log(`Uploading artifact ${platformDefinition.archiveName}...`);
  await artifactClient.uploadArtifact(
    platformDefinition.archiveName,
    [`artifacts/electronPackage/${platformDefinition.archiveName}`],
    "artifacts/electronPackager",
  );
}
