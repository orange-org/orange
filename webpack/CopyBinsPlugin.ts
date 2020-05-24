import fs from "fs-extra";
import Webpack from "webpack";
import getRootDir from "./getRootDir";
import { buildConstants } from "./buildConstants";

const { platform, arch } = process;

const rootDir = getRootDir();
const rootDirSrc = `${rootDir}/${buildConstants.src}`;
const btcdSrcPath = `${rootDirSrc}/${buildConstants.btcd(platform, arch)}`;
const btcdDestinationPath = `${rootDirSrc}/${buildConstants.artifactsWebpackBinPlatformBtcd(
  platform,
  arch,
)}`;

class CopyBinsPlugin {
  apply = (compiler: Webpack.Compiler) => {
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
