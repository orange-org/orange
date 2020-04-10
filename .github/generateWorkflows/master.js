const { compact } = require("lodash");

const isDevelop = process.env.NODE_ENV !== "production";

const steps = {
  npmInstall: {
    name: "npm install",
    run: "npm ci",
  },

  checkout: {
    name: "Checkout repo",
    uses: "actions/checkout@v2",
  },
};

module.exports = {
  name: "Master",

  on: {
    push: {
      branches: ["master"],
    },
    pull_request: {
      branches: ["master"],
    },
  },

  jobs: {
    check: {
      name: "Check",

      strategy: {
        "fail-fast": false,
        matrix: {
          command: compact([
            isDevelop ? null : "npm run check:lint",
            isDevelop ? null : "npm run check:typescript",
            isDevelop ? null : "npm run check:coverage",
            isDevelop ? null : "npm run check:npm-audit",
            "npm run check:depcheck",
          ]),
        },
      },

      "runs-on": "ubuntu-latest",

      steps: [
        steps.checkout,
        steps.npmInstall,
        {
          name: "${{ matrix.command }}",
          uses: "./.github/action",
          with: {
            command: "${{ matrix.command }}",
          },
        },
      ],
    },

    "build-packages": {
      if: !isDevelop,

      name: "Build packages",

      strategy: {
        "fail-fast": false,
        matrix: {
          os: ["macos-latest"],
        },
      },

      needs: "check",

      "runs-on": "${{ matrix.os }}",

      steps: [
        steps.checkout,
        steps.npmInstall,
        {
          name: "Build package on ${{ matrix.os }}",
          uses: "./.github/action",
          with: {
            task: "build-package",
            os: "${{ matrix.os }}",
          },
        },
      ],
    },
  },
};
