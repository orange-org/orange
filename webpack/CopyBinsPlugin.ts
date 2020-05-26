import fs from "fs-extra";
import Webpack from "webpack";
import getRootDir from "./getRootDir";

const { platform, arch } = process;

const rootDir = getRootDir();
const rootDirSrc = `${rootDir}/src`;
const btcd = platform === "win32" ? "btcd.exe" : "btcd";
const btcdSrcPath = `${rootDirSrc}/bin/${platform}-${arch}/${btcd}`;
const btcdDestinationPath = `${rootDir}/artifacts/webpack/bin/${platform}-${arch}/${btcd}`;

export class CopyBinsPlugin {
  apply = (compiler: Webpack.Compiler) => {
    compiler.hooks.emit.tapPromise("CopyBins", async () => {
      const btcdDestinationExists = await fs.pathExists(btcdDestinationPath);

      if (btcdDestinationExists) {
        return;
      }

      await fs.ensureDir(
        `${rootDir}/artifacts/webpack/bin/${platform}-${arch}`,
      );

      await fs.copy(btcdSrcPath, btcdDestinationPath);
    });
  };
}
