/* eslint-disable no-console */
const packager = require("electron-packager");
const { resolve } = require("path");
const bluebird = require("bluebird");
const shelljs = require("shelljs");
const fs = require("fs-extra");
const archiver = require("archiver");

const rootPath = resolve(__dirname, "..");
const artifactsDir = resolve(rootPath, "artifacts");
const webpackArtifactsDir = resolve(artifactsDir, "webpack");
const electronPackagerArtifactsDir = resolve(artifactsDir, "electronPackager");

shelljs.cd(rootPath);

async function bundleElectronApp() {
  console.log("Building source code...");
  await new Promise(resolve_ =>
    shelljs.exec("npm run build", { silent: true }, resolve_),
  );

  console.log("Creating Electron package...");
  await packager({
    arch: "x64",
    dir: webpackArtifactsDir,
    out: electronPackagerArtifactsDir,
    icon: resolve(rootPath, "src/assets/orange"),
    overwrite: true,
    platform: "darwin",
    prune: false,
    quiet: true,
    appVersion: process.env.TRAVIS_TAG,
  });

  console.log("Compressing Electron package...");
  await new Promise(resolve_ => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const output = fs.createWriteStream(
      resolve(
        electronPackagerArtifactsDir,
        `Orange-macOS-${process.env.TRAVIS_TAG}.zip`,
      ),
    );
    archive.pipe(output);
    archive.directory(
      resolve(electronPackagerArtifactsDir, "Orange-darwin-x64/"),
      false,
    );
    output.on("close", resolve_);
    archive.on("error", err => {
      throw err;
    });
    archive.finalize();
  });

  console.log("Done!");
}

bluebird.try(bundleElectronApp).catch(console.error);
