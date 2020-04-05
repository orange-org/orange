/* eslint-disable no-console */
const packager = require("electron-packager");
const { resolve } = require("path");
const bluebird = require("bluebird");
const shelljs = require("shelljs");
const Listr = require("listr");
const fs = require("fs-extra");
const archiver = require("archiver");

const rootPath = resolve(__dirname, "..");
const artifactsDir = resolve(rootPath, "artifacts");
const webpackArtifactsDir = resolve(artifactsDir, "webpack");
const electronPackagerArtifactsDir = resolve(artifactsDir, "electronPackager");

shelljs.cd(rootPath);

async function bundleElectronApp() {
  const tasks = new Listr([
    {
      title: "Building source code",
      task: async () => {
        await new Promise(resolve_ =>
          shelljs.exec("npm run build", { silent: true }, resolve_),
        );
      },
    },

    {
      title: "Creating Electron package",
      task: async () => {
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
      },
    },

    {
      title: "Compressing Electron package",
      task: async (_ctx, task) => {
        await new Promise(resolve_ => {
          const archive = archiver("zip", { zlib: { level: 9 } });
          const output = fs.createWriteStream(
            resolve(electronPackagerArtifactsDir, "Orange (macOS).zip"),
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
      },
    },
  ]);

  return tasks.run();
}

bluebird.try(bundleElectronApp).catch(console.error);
