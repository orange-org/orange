import * as rimraf from "rimraf";
import * as pkgDir from "pkg-dir";
import * as path from "path";
import { ncp } from "ncp";

const rootPath = pkgDir.sync() as string;
const destination = path.join(rootPath, "dist");
const source = path.join(rootPath, "src");

rimraf(destination, () => null);

ncp(
  source,
  destination,
  {
    filter: fileName => {
      return [".ts", ".tsx"].includes(path.extname(fileName)) === false;
    }
  },
  error => {
    if (error) {
      return console.error(error);
    }

    console.log("Done!");
  }
);

// Remove dist folder
// Recreate dist folder
// Copy all non ts/tsx files to dist folder
