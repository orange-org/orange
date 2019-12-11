import * as rimraf from "rimraf";
import * as pkgDir from "pkg-dir";
import * as path from "path";
import * as fs from "fs-extra";
import * as bluebird from "bluebird";

const rootPath = pkgDir.sync() as string;
const destination = path.join(rootPath, "dist");
const source = path.join(rootPath, "src");

rimraf(destination, () => null);

bluebird
  .try(async () => {
    await fs.mkdirp(destination);
    await fs.copy(source, destination, {
      filter: fileName => {
        console.log("=\nFILE: prepare-dist.ts\nLINE: 17\n=");
        console.log("fileName", fileName);
        console.log("path.extname(fileName)", path.extname(fileName));
        return [".ts", ".tsx"].includes(path.extname(fileName)) === false;
      }
    });
  })
  .catch(error => {
    console.error("Error while running `prepare-dist`:", error.message);
    process.exit(1);
  });

// Remove dist folder
// Recreate dist folder
// Copy all non ts/tsx files to dist folder
