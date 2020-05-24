const fs = require("fs-extra");
const getRootDir = require("./getRootDir");
const buildConstants = require("./buildConstants");

const { platform, arch } = process;

const rootDir = getRootDir();

class CopyBinsPlugin {
  apply = compiler => {
    compiler.hooks.emit.tapPromise("CopyBins", async () => {
      const btcdSrcPath = `${rootDir}/${buildConstants.btcd(platform, arch)}`;
      const btcdDestinationPath = `${rootDir}/${buildConstants.artifactsWebpackBinPlatformBtcd(
        platform,
        arch,
      )}`;

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
