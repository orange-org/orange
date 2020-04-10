const { compact } = require("lodash");
const { isDevelop } = require("./isDevelop");

const commonSteps = [
  {
    name: "Checkout repo",
    uses: "actions/checkout@v2",
  },
  {
    name: "npm install",
    run: "npm ci",
  },
];

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
    // check: {
    //   name: "Check",

    //   strategy: {
    //     "fail-fast": false,
    //     matrix: {
    //       command: compact([
    //         isDevelop ? null : "npm run check:lint",
    //         isDevelop ? null : "npm run check:typescript",
    //         isDevelop ? null : "npm run check:coverage",
    //         isDevelop ? null : "npm run check:npm-audit",
    //         "npm run check:depcheck",
    //       ]),
    //     },
    //   },

    //   "runs-on": "ubuntu-latest",

    //   steps: [
    //     ...commonSteps,
    //     {
    //       name: "${{ matrix.command }}",
    //       uses: "./.github/action",
    //       with: {
    //         command: "${{ matrix.command }}",
    //       },
    //     },
    //   ],
    // },

    build: {
      if: !isDevelop,

      name: "Build",

      strategy: {
        "fail-fast": false,
        matrix: {
          os: ["macos-latest", "ubuntu-latest", "windows-latest"],
        },
      },

      "runs-on": "${{ matrix.os }}",

      steps: [
        ...commonSteps,
        {
          name: "Build ${{ matrix.os }}",
          uses: "./.github/action",
          with: {
            task: "build",
            os: "${{ matrix.os }}",
          },
        },
      ],
    },
  },
};
