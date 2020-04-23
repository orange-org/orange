export const getCookieFilePath = (chain: string, dataDir: string) => {
  let networkDir: string;

  if (chain === "testnet") {
    networkDir = `${dataDir}/testnet3/`;
  } else if (chain === "regtest") {
    networkDir = `${dataDir}/regtest/`;
  } else {
    networkDir = `${dataDir}/`;
  }

  return `${networkDir}.cookie`;
};
