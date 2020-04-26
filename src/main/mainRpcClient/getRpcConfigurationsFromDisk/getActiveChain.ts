/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */

const possibleChainNames = ["testnet", "regtest"];

/**
 * Parse `bitcoin.conf`. Use code copied from here:
 * https://github.com/steveukx/properties/blob/96ba64fa1b48b72f0c53e07b99fe38b96001229e/src/PropertiesReader.js#L69-L82
 */
export const getActiveChain = (bitcoinConf: string) =>
  bitcoinConf.split("\n").reduce((result, line) => {
    if ((line = line.trim())) {
      const section = /^\[([^=]+)]$/.exec(line);
      const property = !section && /^([^#=]+)(={0,1})(.*)$/.exec(line);

      /* istanbul ignore else */
      if (property) {
        const key = property[1].trim();
        const value = property[3].trim();

        /* istanbul ignore else */
        if (possibleChainNames.includes(key) && value === "1") {
          return key;
        }
      }

      /* istanbul ignore next */
      return result;
    }

    return result;
  }, "");
