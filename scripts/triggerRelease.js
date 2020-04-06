/* eslint-disable no-console */
const shelljs = require("shelljs");
const { resolve } = require("path");

const [, , version] = process.argv;
const semverRegExp = /^([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
const repoUrl = "git@github.com:orange-org/orange.git";

if (!version.match(semverRegExp)) {
  throw new Error(`"${version}" is not a valid semantic version`);
}

shelljs.cd(resolve(__dirname, ".."));

console.log(`Creating git tag ${version}...`);
shelljs.exec(`git tag ${version}`);

console.log(`Pushing git tag ${version}...`);
shelljs.exec(`git push ${repoUrl} ${version}`);

console.log(
  `\n\n"${version}" has been successfully pushed to ${repoUrl}.\n` +
    "This should trigger a Travis CI draft release https://travis-ci.org/github/orange-org/orange",
);
