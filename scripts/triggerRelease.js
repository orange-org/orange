/* eslint-disable no-console */
const shelljs = require("shelljs");
const { resolve } = require("path");

const [, , version] = process.argv;
const semverRegExp = /^([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
const repoUrl = "git@github.com:orange-org/orange.git";

if (!version.match(semverRegExp)) {
  shelljs.echo(`"${version}" is not a valid semantic version`);
  shelljs.exit(1);
}

shelljs.cd(resolve(__dirname, ".."));

shelljs.echo(`Creating git tag ${version}...`);
if (shelljs.exec(`git tag ${version}`).code !== 0) {
  shelljs.echo("Error: git tag failed");
  shelljs.exit(1);
}

shelljs.echo(`Pushing git tag ${version}...`);
if (shelljs.exec(`git push ${repoUrl} ${version}`).code !== 0) {
  shelljs.echo("Error: git push failed");
  shelljs.exit(1);
}

shelljs.echo(
  `\n\n"${version}" has been successfully pushed to ${repoUrl}.\n` +
    "This should trigger a GitHub Actions draft release https://github.com/orange-org/orange/actions",
);
