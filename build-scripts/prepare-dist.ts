import * as pkgDir from "pkg-dir";
import * as path from "path";
import * as fs from "fs-extra";
import * as bluebird from "bluebird";

const rootPath = pkgDir.sync() as string;
const destination = path.join(rootPath, "dist");
const source = path.join(rootPath, "src");

bluebird
  .try(async () => {
    await fs.remove(destination);
    await fs.mkdirp(destination);
    await fs.copy(source, destination, {
      filter: fileName => {
        return [".ts", ".tsx"].includes(path.extname(fileName)) === false;
      }
    });
  })
  .catch(error => {
    console.error("Error while running `prepare-dist`:", error.message);
    process.exit(1);
  });
