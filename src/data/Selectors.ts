import { createSelector } from "reselect";
import { State } from "./ReducerCreator";
import { Esplora } from "./Esplora";

export class Selectors {
  static getAddressesAnalysis = createSelector(
    (state: State) => state.walletAddresses,
    (state: State) => state.walletChangeAddresses,
    (walletAddresses, walletChangeAddresses) => {
      if (!walletAddresses || !walletChangeAddresses) {
        return null;
      }

      const addressesAnalysis = Esplora.getAddressesAnalysis(walletAddresses);
      const changeAddressesAnalysis = Esplora.getAddressesAnalysis(
        walletChangeAddresses,
      );

      return {
        nextUnusedAddress: addressesAnalysis.nextUnusedAddress,
        nextUnusedChangeAddress: changeAddressesAnalysis.nextUnusedAddress,
        balance: addressesAnalysis.balance + changeAddressesAnalysis.balance,
        pendingBalance:
          addressesAnalysis.pendingBalance +
          changeAddressesAnalysis.pendingBalance,
      };
    },
  );
}
