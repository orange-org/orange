const masterWorkflow = require("./master");

module.exports = {
  name: "Draft Release",

  on: {
    push: "tags",
  },

  jobs: {
    ...masterWorkflow.jobs,

    "create-draft-release": {
      if: false,
      name: "Create draft GitHub Release",
      needs: "build-packages",
    },
  },
};
