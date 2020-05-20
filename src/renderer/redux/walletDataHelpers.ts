import { WalletList } from "_t/RpcResponses";

export const orangeWalletNamePrefix = "o75c";

export const orangeWalletNameRegExp = new RegExp(
  // eslint-disable-next-line no-useless-escape
  `^${orangeWalletNamePrefix}-\d+$`,
);

export const isOrangeWalletName = (walletName: string) =>
  walletName.match(orangeWalletNameRegExp) !== null;

export const getOrangeWalletList = (walletList: WalletList) =>
  walletList.filter(walletName => isOrangeWalletName(walletName));

export const getWalletName = (orangeWalletList: WalletList) => {
  const currentNumberOfWallets = orangeWalletList.length;

  return `${orangeWalletNamePrefix}-${currentNumberOfWallets + 1}`;
};
