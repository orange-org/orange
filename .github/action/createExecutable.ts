/**
 * This file must be runnable on both the local development environment and
 * on GitHub Actions
 */
/* eslint-disable no-console */
import * as core from "@actions/core";
import * as artifact from "@actions/artifact";
import fs from "fs-extra";
import * as packager from "electron-packager";
import * as archiver from "archiver";
import { basename } from "path";
import * as electronInstaller from "electron-winstaller";
import bluebird from "bluebird";
import { getAppVersion } from "./getAppVersion";
import { execWithErrorMessage } from "./utils";
import pkgJson from "../../package.json";
import { isOnGithubActions } from "./isOnGithubActions";

const artifactClient = artifact.create();
const appVersion = getAppVersion();
const electronPackagerArtifactDir = "artifacts/electronPackager";

const { productName } = pkgJson;

export const platformDefinitions = {
  darwin: {
    archiveName: `${productName}-v${appVersion}-macOS.zip`,
  },
  linux: {
    archiveName: `${productName}-v${appVersion}-Linux.zip`,
  },
  win32: {
    archiveName: `${productName}-v${appVersion}-Windows.exe`,
  },
};

export const createExecutable = async () => {
  console.log("Building source code...");
  await execWithErrorMessage("npm run build", "`npm run build` failed");

  const os = process.platform;
  const { archiveName } = platformDefinitions[os];

  console.log(`Creating Electron package on ${os}...`);
  await packager({
    arch: "x64",
    dir: "artifacts/webpack",
    out: electronPackagerArtifactDir,
    icon: "src/assets/orange",
    overwrite: true,
    platform: os,
    prune: false,
    appVersion: getAppVersion(),
  });

  if (os === "darwin") {
    console.log("Compressing Electron package...");
    await new Promise(resolve_ => {
      const archive = archiver("zip", { zlib: { level: 9 } });
      const output = fs.createWriteStream(
        `${electronPackagerArtifactDir}/${archiveName}`,
      );
      archive.pipe(output);
      archive.directory(
        `${electronPackagerArtifactDir}/${productName}-${os}-x64/`,
        false,
      );
      output.on("close", resolve_);
      archive.on("error", error => {
        console.error(error);
        core.setFailed(`Could not create a zip archive on ${os}`);
      });
      archive.finalize();
    });
  } else if (os === "win32") {
    console.log(`Creating ${archiveName}...`);
    await electronInstaller.createWindowsInstaller({
      appDirectory: `${electronPackagerArtifactDir}/${productName}-${os}-x64`,
      outputDirectory: electronPackagerArtifactDir,
      authors: "https://github.com/orange-org",
      exe: `${productName}.exe`,
      setupExe: archiveName,
      version: appVersion,
      name: productName,
      title: productName,
      iconUrl:
        "https://raw.githubusercontent.com/msafi/orange/55d3cebd112e8e5ea0cf3a3ecf2bb6aa824ba3c4/src/assets/orange.ico",
      setupIcon: "src/assets/orange.ico",
    });
  }

  if (isOnGithubActions) {
    console.log(`Uploading ${archiveName}...`);
    await artifactClient.uploadArtifact(
      basename(archiveName),
      [`${electronPackagerArtifactDir}/${archiveName}`],
      electronPackagerArtifactDir,
    );
  }
};

if (process.env.FILENAME === "createExecutable") {
  bluebird.try(createExecutable).catch(console.error);
}
