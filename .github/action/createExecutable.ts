/* eslint-disable no-console */
import * as core from "@actions/core";
import * as artifact from "@actions/artifact";
import fs from "fs-extra";
import * as packager from "electron-packager";
import * as archiver from "archiver";
import { basename } from "path";
import * as electronInstaller from "electron-winstaller";
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
    archiveName: `Orange-v${appVersion}-Windows.exe`,
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

  if (os === "macos-latest") {
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
  } else if (os === "windows-latest") {
    console.log(`Creating ${archiveName}...`);
    await electronInstaller.createWindowsInstaller({
      appDirectory: `${electronPackagerArtifactDir}/Orange-${electronPackagerPlatform}-x64`,
      outputDirectory: electronPackagerArtifactDir,
      authors: "https://github.com/orange-org",
      exe: "Orange.exe",
      setupExe: archiveName,
      version: appVersion,
    });
  }

  console.log(`Uploading ${archiveName}...`);
  await artifactClient.uploadArtifact(
    basename(archiveName),
    [`${electronPackagerArtifactDir}/${archiveName}`],
    electronPackagerArtifactDir,
  );
};
