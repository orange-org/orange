const fs = require("fs");

module.exports = {
  __NONCE__: JSON.stringify(
    fs.readFileSync(`${__dirname}/../.nonce`, { encoding: "utf8" }),
  ),
};
