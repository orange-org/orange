const fs = require("fs-extra");
const getRootDir = require("./getRootDir");
const buildConstants = require("./buildConstants");

const { platform, arch } = process;

class CopyBinsPlugin {
  apply = compiler => {
    compiler.hooks.emit.tapPromise("CopyBins", async () => {
      const btcdSrcPath = `${getRootDir}/${buildConstants.btcd(
        platform,
        arch,
      )}`;
      const btcdDestinationPath = `${getRootDir}/${buildConstants.artifactsWebpackBinPlatformBtcd(
        platform,
        arch,
      )}`;

      const btcdDestinationExists = await fs.pathExists(btcdDestinationPath);

      if (btcdDestinationExists) {
        return;
      }

      await fs.ensureDir(
        `${getRootDir}/${buildConstants.artifactsWebpackBinPlatform(
          platform,
          arch,
        )}`,
      );

      await fs.copy(btcdSrcPath, btcdDestinationPath);
    });
  };
}

module.exports = CopyBinsPlugin;
