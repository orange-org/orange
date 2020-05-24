const fs = require("fs-extra");
const getRootDir = require("./getRootDir");
const buildConstants = require("./buildConstants");

const { platform, arch } = process;

const rootDir = getRootDir();
const rootDirSrc = `${rootDir}/${buildConstants.src}`;
const btcdSrcPath = `${rootDirSrc}/${buildConstants.btcd(platform, arch)}`;
const btcdDestinationPath = `${rootDirSrc}/${buildConstants.artifactsWebpackBinPlatformBtcd(
  platform,
  arch,
)}`;

class CopyBinsPlugin {
  apply = compiler => {
    compiler.hooks.emit.tapPromise("CopyBins", async () => {
      const btcdDestinationExists = await fs.pathExists(btcdDestinationPath);

      if (btcdDestinationExists) {
        return;
      }

      await fs.ensureDir(
        `${rootDir}/${buildConstants.artifactsWebpackBinPlatform(
          platform,
          arch,
        )}`,
      );

      await fs.copy(btcdSrcPath, btcdDestinationPath);
    });
  };
}

module.exports = CopyBinsPlugin;
