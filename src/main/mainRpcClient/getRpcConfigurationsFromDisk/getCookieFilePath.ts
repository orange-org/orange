export const getCookieFilePath = (chain: string, dataDir: string) => {
  let networkDir: string;

  /* istanbul ignore if */ if (chain === "testnet") {
    networkDir = `${dataDir}/testnet3/`;
  } /* istanbul ignore if */ else if (chain === "regtest") {
    networkDir = `${dataDir}/regtest/`;
  } else {
    networkDir = `${dataDir}/`;
  }

  return `${networkDir}.cookie`;
};
