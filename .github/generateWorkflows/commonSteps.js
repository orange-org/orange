module.exports.commonSteps = [
  {
    name: "Checkout repo",
    uses: "actions/checkout@v2",
  },
  {
    name: "npm install",
    run: "npm ci",
  },
];
