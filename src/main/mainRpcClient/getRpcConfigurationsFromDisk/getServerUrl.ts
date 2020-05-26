export const getServerUrl = (chainName?: string) => {
  const port =
    // eslint-disable-next-line no-nested-ternary
    chainName === "testnet"
      ? /* istanbul ignore next */ 18332
      : chainName === "regtest"
      ? /* istanbul ignore next */ 18443
      : 8332;

  return `http://127.0.0.1:${port}`;
};
