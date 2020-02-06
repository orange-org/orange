const { globalConstants } = require("../webpack/globalConstants");

module.exports = async () => {
  Object.keys(globalConstants).forEach(key => {
    global[key] = globalConstants[key];
  });
};
