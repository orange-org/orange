/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const fs = require("fs-extra");
const bluebird = require("bluebird");
const axios = require("axios");
const shelljs = require("shelljs");
const { resolve } = require("path");
const Listr = require("listr");
const rendererWebpackConfig = require("../webpack/webpack.renderer.config");
const mainWebpackConfig = require("../webpack/webpack.main.config");

const distDir = resolve(__dirname, "..", "dist");
const osxDir = resolve(distDir, "osx");
const electronZipPath = `${osxDir}/electron.zip`;
const appDir = resolve(osxDir, "Electron.app/Contents/Resources/app/");
const orangeAppDir = appDir.replace("Electron", "Orange");

const createDistribution = async () => {
  shelljs.cd(distDir);

  const preparingElectronBinariesTasks = new Listr([
    {
      title: "Retrieving latest releases",
      task: async ctx => {
        const releases = await axios.get(
          "https://api.github.com/repos/electron/electron/releases/latest",
        );

        const electronDarwinX64ZipEntry = releases.data.assets.find(asset => {
          return asset.name.match(/electron-v\d+\.\d+\.\d+-darwin-x64.zip/);
        });

        ctx.browserDownloadUrl = electronDarwinX64ZipEntry.browser_download_url;
      },
    },
    {
      title: "Downloading binary",
      task: async (ctx, task) => {
        task.title = `Downloading ${ctx.browserDownloadUrl}`;

        const binaryWriter = fs.createWriteStream(electronZipPath);

        const response = await axios({
          url: ctx.browserDownloadUrl,
          method: "GET",
          responseType: "stream",
        });

        response.data.pipe(binaryWriter);

        await new Promise(resolve_ => binaryWriter.on("finish", resolve_));
      },
    },
    {
      title: `Unzipping ${electronZipPath}`,
      task: () =>
        new Promise(resolve_ => {
          shelljs.exec(
            `unzip ${electronZipPath} -d ${osxDir}`,
            { silent: true },
            resolve_,
          );
        }),
    },
    {
      title: `Removing ${electronZipPath}`,
      task: () => fs.remove(electronZipPath),
    },
    {
      title: `Creating ${appDir}`,
      task: () => {
        return fs.ensureDir(appDir);
      },
    },
    {
      title: "Branding",
      task: () =>
        new Listr([
          {
            title: "Renaming Electron.app to Orange.app",
            task: () =>
              fs.rename(
                resolve(osxDir, "Electron.app"),
                resolve(osxDir, "Orange.app"),
              ),
          },

          {
            title: "Renaming Electron Helpers to Orange Helpers",
            task: async () => {
              const helpersDir = resolve(
                osxDir,
                "Orange.app/Contents/Frameworks",
              );
              const helperFiles = [
                "Electron Helper.app",
                "Electron Helper (Plugin).app",
                "Electron Helper (GPU).app",
                "Electron Helper (Renderer).app",
              ];

              await Promise.all(
                helperFiles.map(helperFile => {
                  return fs.rename(
                    resolve(helpersDir, helperFile),
                    resolve(
                      helpersDir,
                      helperFile.replace("Electron", "Orange"),
                    ),
                  );
                }),
              );
            },
          },

          {
            title: "Updating plist files",
            task: () => {
              const plistFiles = [
                resolve(osxDir, "Orange.app/Contents/Info.plist"),
                resolve(
                  osxDir,
                  "Orange.app/Contents/Frameworks/Orange Helper.app/Contents/Info.plist",
                ),
              ];

              return bluebird.map(plistFiles, async plistFile => {
                const content = await fs.readFile(plistFile, {
                  encoding: "utf8",
                });
                await fs.writeFile(
                  plistFile,
                  content
                    .replace(/Electron/g, "Orange")
                    .replace(/electron/g, "orange"),
                  { encoding: "utf8" },
                );
              });
            },
          },
        ]),
    },
  ]);

  const buildingTasks = new Listr([
    {
      title: "Executing `npm run build`",
      task: async () => {
        shelljs.cd(resolve(distDir, ".."));

        await new Promise(resolve_ =>
          shelljs.exec("npm run build", { silent: true }, resolve_),
        );
        shelljs.cd(distDir);
      },
    },
  ]);

  const tasks = new Listr(
    [
      {
        title: `Cleaning ${osxDir}`,
        task: async () => {
          await fs.remove(osxDir);
          await fs.ensureDir(osxDir);
        },
      },

      {
        title: "Preparing Electron binaries and building the app",
        task: () =>
          new Listr(
            [
              {
                title: "Preparing Electron binaries",
                task: () => preparingElectronBinariesTasks,
              },
              {
                title: "Building",
                task: () => buildingTasks,
              },
            ],
            { concurrent: true },
          ),
      },

      {
        title: `Moving files to ${orangeAppDir}`,
        task: async () => {
          await Promise.all([
            fs.copy(
              resolve(distDir, "renderer"),
              resolve(orangeAppDir, "renderer"),
            ),
            fs.copy(resolve(distDir, "main"), resolve(orangeAppDir, "main")),
            fs.copy(
              resolve(distDir, "..", "package.json"),
              resolve(orangeAppDir, "package.json"),
            ),
          ]);
        },
      },
    ],
    { collapse: false },
  );

  tasks.run();
};

// eslint-disable-next-line no-console
bluebird.try(createDistribution).catch(console.error);
