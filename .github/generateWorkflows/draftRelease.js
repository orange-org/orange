const masterWorkflow = require("./master");
const { isDevelop } = require("./isDevelop");
const { commonSteps } = require("./commonSteps");

module.exports = {
  name: "Draft Release",

  on: {
    create: { tags: ["*"] },
  },

  jobs: {
    ...masterWorkflow.jobs,

    "draft-release": {
      if: !isDevelop,

      name: "Draft release",

      needs: "create-executable",

      "runs-on": "ubuntu-latest",

      steps: [
        ...commonSteps,
        {
          name: "Draft release",
          uses: "./.github/action",
          with: {
            task: "draft-release",
            githubToken: "${{ secrets.GITHUB_TOKEN }}",
          },
        },
      ],
    },
  },
};
