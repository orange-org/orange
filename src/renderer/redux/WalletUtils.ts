import { WalletList } from "_t/RpcResponses";

export class WalletUtils {
  static orangeWalletNamePrefix = "o75c";

  static orangeWalletNameRegExp = new RegExp(
    `^${WalletUtils.orangeWalletNamePrefix}-\\d+$`,
  );

  static isOrangeWalletName = (walletName: string) =>
    walletName.match(WalletUtils.orangeWalletNameRegExp) !== null;

  static getOrangeWalletList = (walletList: WalletList) =>
    walletList.filter(walletName => WalletUtils.isOrangeWalletName(walletName));

  static getWalletName = (orangeWalletList: WalletList) => {
    const currentNumberOfWallets = orangeWalletList.length;

    return `${WalletUtils.orangeWalletNamePrefix}-${currentNumberOfWallets +
      1}`;
  };
}
