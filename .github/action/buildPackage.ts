/* eslint-disable no-console */
import * as core from "@actions/core";
import bluebird from "bluebird";
import * as packager from "electron-packager";
import { getAppVersion } from "./getAppVersion";
import { execWithErrorMessage } from "./utils";

const githubActionElectronPackagerPlatformNameMap = {
  "macos-latest": "darwin",
  "ubuntu-latest": "linux",
  "windows-latest": "win32",
} as any;

export async function buildPackage() {
  console.log("Building source code...");
  await execWithErrorMessage("npm run build", "`npm run build` failed");

  const os = core.getInput("os", { required: true });

  console.log(`Creating Electron package on ${os}...`);
  await packager({
    arch: "x64",
    dir: "artifacts/webpack",
    out: "artifacts/electronPackager",
    icon: "src/assets/orange",
    overwrite: true,
    platform: githubActionElectronPackagerPlatformNameMap[os],
    prune: false,
    appVersion: getAppVersion(),
  });

  // console.log("Compressing Electron package...");
  // await new Promise(resolve_ => {
  //   const archive = archiver("zip", { zlib: { level: 9 } });
  //   const output = fs.createWriteStream(
  //     resolve(
  //       electronPackagerArtifactsDir,
  //       `Orange-macOS-${process.env.TRAVIS_TAG}.zip`,
  //     ),
  //   );
  //   archive.pipe(output);
  //   archive.directory(
  //     resolve(electronPackagerArtifactsDir, "Orange-darwin-x64/"),
  //     false,
  //   );
  //   output.on("close", resolve_);
  //   archive.on("error", err => {
  //     throw err;
  //   });
  //   archive.finalize();
  // });

  // console.log("Done!");
}

// bluebird.try(buildPackage).catch(console.error);
