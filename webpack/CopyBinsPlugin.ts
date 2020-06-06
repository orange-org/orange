import fs from "fs-extra";
import Webpack from "webpack";
import getRootDir from "./getRootDir";

const { platform, arch } = process;

const rootDir = getRootDir();
const rootDirSrc = `${rootDir}/src`;
const bitcoind = platform === "win32" ? "bitcoind.exe" : "bitcoind";
const bitcoindSrcPath = `${rootDirSrc}/bin/${platform}-${arch}/${bitcoind}`;
const bitcoindDestinationPath = `${rootDir}/artifacts/webpack/bin/${platform}-${arch}/${bitcoind}`;

export class CopyBinsPlugin {
  apply = (compiler: Webpack.Compiler) => {
    compiler.hooks.emit.tapPromise("CopyBins", async () => {
      const bitcoindDestinationExists = await fs.pathExists(
        bitcoindDestinationPath,
      );

      if (bitcoindDestinationExists) {
        return;
      }

      await fs.ensureDir(
        `${rootDir}/artifacts/webpack/bin/${platform}-${arch}`,
      );

      await fs.copy(bitcoindSrcPath, bitcoindDestinationPath);
    });
  };
}
