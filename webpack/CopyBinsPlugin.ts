/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
import fs from "fs-extra";
import Webpack from "webpack";
import getRootDir from "./getRootDir";

const { platform, arch } = process;

const rootDir = getRootDir();
const rootDirSrc = `${rootDir}/src`;
const bins = ["bitcoind", "lnd"];

export class CopyBinsPlugin {
  apply = (compiler: Webpack.Compiler) => {
    compiler.hooks.emit.tapPromise("CopyBins", async () => {
      for (const bin of bins) {
        const platformBin = platform === "win32" ? `${bin}.exe` : bin;
        const binSrcPath = `${rootDirSrc}/bin/${platform}-${arch}/${platformBin}`;
        const binDestinationPath = `${rootDir}/artifacts/webpack/bin/${platform}-${arch}/${platformBin}`;

        const binDestinationExists = await fs.pathExists(binDestinationPath);

        if (binDestinationExists) {
          continue;
        }

        await fs.ensureDir(
          `${rootDir}/artifacts/webpack/bin/${platform}-${arch}`,
        );

        await fs.copy(binSrcPath, binDestinationPath);
      }
    });
  };
}
