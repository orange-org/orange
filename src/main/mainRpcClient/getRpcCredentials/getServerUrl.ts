export const getServerUrl = (chainName: string) => {
  const port =
    // eslint-disable-next-line no-nested-ternary
    chainName === "testnet" ? 18332 : chainName === "regtest" ? 18443 : 8332;

  return `http://localhost${port}`;
};
