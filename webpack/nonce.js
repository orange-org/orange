const fs = require("fs");

module.exports = fs
  .readFileSync(`${__dirname}/../.nonce`, {
    encoding: "utf8",
  })
  .trim();
