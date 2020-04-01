/* eslint-disable no-console */
const https = require("https");
const fs = require("fs-extra");
const bluebird = require("bluebird");
const axios = require("axios");
const { exec, rm } = require("shelljs");

const createDistribution = async () => {
  const directory = "dist/osx";
  /**
   * Create an `osx` folder in `dist`. This folder will contain the final
   * package which will be distributed to users.
   */
  console.log(`Preparing ${directory}`);
  rm("-r", directory);
  await fs.ensureDir(directory);

  await Promise.all([
    /**
     * Prepare the Electron binary for OS X
     */
    (async () => {
      console.log("Retrieving latest releases...");
      const releases = await axios.get(
        "https://api.github.com/repos/electron/electron/releases/latest",
      );

      const electronDarwinX64ZipEntry = releases.data.assets.find(asset => {
        return asset.name.match(/electron-v\d+\.\d+\.\d+-darwin-x64.zip/);
      });

      const electronZipPath = `${directory}/electron.zip`;
      const binaryWriter = fs.createWriteStream(electronZipPath);

      console.log("Downloading OS X Electron binary...");
      const response = await axios({
        url: electronDarwinX64ZipEntry.browser_download_url,
        method: "GET",
        responseType: "stream",
      });

      response.data.pipe(binaryWriter);

      await new Promise(resolve => binaryWriter.on("finish", resolve));

      console.log(`Unzipping ${electronZipPath}`);
      await exec(`unzip ${electronZipPath}`, { async: true });
    })(),
  ]);
};

// eslint-disable-next-line no-console
bluebird.try(createDistribution).catch(console.error);
