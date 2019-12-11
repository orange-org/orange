// import * as ncp from 'ncp';
import * as rimraf from "rimraf";
import * as pkgDir from "pkg-dir";
import * as path from "path";

const rootPath = pkgDir.sync() as string;

//
// rimraf(path.join(rootPath, 'dist'));

// Remove dist folder
// Recreate dist folder
// Copy all non ts/tsx files to dist folder
