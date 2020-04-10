const masterWorkflow = require("./master");
const { isDevelop } = require("./isDevelop");

module.exports = {
  name: "Draft Release",

  on: {
    push: "tags",
  },

  jobs: {
    ...masterWorkflow.jobs,

    "draft-release": {
      if: !isDevelop,
      name: "Create draft GitHub Release",
      needs: Object.keys(masterWorkflow.jobs),
      with: {
        task: "draft-release",
      },
    },
  },
};
