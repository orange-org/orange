/* eslint-disable no-console */
const { echo, exit, exec, cd } = require("shelljs");
const { resolve } = require("path");

const [, , version] = process.argv;
const semverRegExp = /^([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)\.([0-9]|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
const repoUrl = "git@github.com:orange-org/orange.git";

if (!version.match(semverRegExp)) {
  echo(`"${version}" is not a valid semantic version`);
  exit(1);
}

echo("Checking current branch");
const currentBranch = exec("git rev-parse --abbrev-ref HEAD", {
  silent: true,
});

if (currentBranch.code !== 0) {
  echo("Error: `git rev-parse --abbrev-ref HEAD` failed");
  exit(1);
}

if (currentBranch.stdout !== "master") {
  echo("Error: you must be on `master` to trigger a release");
  exit(1);
}

cd(resolve(__dirname, ".."));

echo(`Creating git tag ${version}...`);
if (exec(`git tag ${version}`).code !== 0) {
  echo("Error: git tag failed");
  exit(1);
}

echo(`Pushing git tag ${version}...`);
if (exec(`git push ${repoUrl} ${version}`).code !== 0) {
  echo("Error: git push failed");
  exit(1);
}

echo(
  `\n\n"${version}" has been successfully pushed to ${repoUrl}.\n` +
    "This should trigger a GitHub Actions draft release https://github.com/orange-org/orange/actions",
);
