import * as core from "@actions/core";
import { exec } from "@actions/exec";

async function run() {
  core.debug("Im here!");

  // let myOutput = "";
  // let myError = "";

  // const options = {} as any;
  // options.listeners = {
  //   stdout: (data: Buffer) => {
  //     myOutput += data.toString();
  //   },
  //   stderr: (data: Buffer) => {
  //     myError += data.toString();
  //   },
  // };

  // await exec("npm ci", [], options);
  // await exec("npm ci", [], options);

  // core.debug(myOutput);
  // core.debug(myError);
  await exec("npm ci", null, { failOnStdErr: true });
  await exec("npm run check:lint", null, { failOnStdErr: true });
}

run();
