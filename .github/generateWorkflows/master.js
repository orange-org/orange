const { compact } = require("lodash");
const { isDevelop } = require("./isDevelop");
const { commonSteps } = require("./commonSteps");

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
            // isDevelop ? null : "npm run check:coverage",
            isDevelop ? null : "npm run check:npm-audit",
            "npm run check:depcheck",
          ]),
        },
      },

      "runs-on": "ubuntu-latest",

      steps: [
        ...commonSteps,
        {
          name: "${{ matrix.command }}",
          uses: "./.github/action",
          with: {
            command: "${{ matrix.command }}",
          },
        },
      ],
    },

    "create-executable": {
      if: !isDevelop,

      name: "Create executable",

      strategy: {
        "fail-fast": false,
        matrix: {
          // os: ["macos-latest", "ubuntu-latest", "windows-latest"],
          os: ["macos-latest", "windows-latest"],
        },
      },

      "runs-on": "${{ matrix.os }}",

      steps: [
        ...commonSteps,
        {
          name: "Create executable ${{ matrix.os }}",
          uses: "./.github/action",
          with: {
            task: "create-executable",
          },
        },
      ],
    },
  },
};
