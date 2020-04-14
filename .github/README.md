# Orange CI/CD using GitHub Actions

Orange's CI/CD uses GitHub Actions. Working with this pipeline requires an
understanding of the concepts of GitHub Actions. Concepts such as:

- workflows
- jobs
- actions

We have two workflows: "Master" and "Draft Release".

## The Master workflow

The Master workflow is defined at
['.github/generateWorkflows/master.js'](.github/generateWorkflows/master.js). It
runs for merges to the `master` branch and pull requests against the `master`
branch.

The Master workflow runs checks and builds the executables. Its success gives us
some assurance that the code is in a good state.

## The Draft Release workflow

The Draft Release workflow is defined at
['.github/generateWorkflows/draftRelease.js'](.github/generateWorkflows/draftRlease.js).
It runs for newly created tags. It's mainly responsible for creating a draft
release on GitHub.

The draft release is useful because it will have all the necessary executables
already uploaded.

A maintainer has to then create the final release and publish it on GitHub's UI.

## How to make a new release

Run `npm run trigger-release <some semantic version>`. For example

```bash
npm run trigger-release 1.0.0
# or
npm run trigger-release 1.0.0-beta.10
```

This command will create a local git tag and push it to GitHub. The Draft
Release workflow will then be triggered.

## Modifying and developing Orange's workflows

GitHub Action workflows are expected to be in Yaml format, not JavaScript.

But we define them in JavaScript because this gives us more modularity and
flexibility.

So to modify the workflows, edit the JS files at
['.github/generateWorkflows'](.github/generateWorkflows) and when you're done
run the following npm script.

```bash
NODE_ENV=production npm run generate-workflows
```

This script will execute the file
['.github/generateWorkflows/generateWorkflows.js'](.github/generateWorkflows/generateWorkflows.js)
which will generate the Yaml files at ['.github/workflows'](.github/workflows).

## Modifying and developing `.github/action`

A GitHub Action needs to be in plain JavaScript, not TypeScript. However,
Orange's action is developed in TypeScript and it is then compiled with webpack
into a single plain JavaScript bundle at
['.github/action/action.js'](.github/action/action.js).

If you modify any of the code at ['.github/action'](.github/action), you will
need to recompile the bundle and commit the resulting changes.

To compile the bundle, run

```bash
NODE_ENV=production npm run build-action
```

## Building an executable locally

If you need to build an executable locally for your operating system, you can
run the command

```bash
npm run create-executable
```

This command will run the script
['.github/action/createExecutable.ts'](.github/action/createExecutable.ts),
which will generate an executable targeted to your operating system. You will
find the executable at
['artifacts/electronPackager'](artifacts/electronPackager).

`createExecutable.ts` can run on a local development environment in addition to
running on a GitHub Action machine.
