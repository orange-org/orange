const nonce = require("./nonce");

module.exports = {
  __NONCE__: JSON.stringify(nonce),
};
