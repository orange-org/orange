import { BlockchainService, AddressData } from "./BlockchainService";

export class Esplora extends BlockchainService {
  private static call = async (path: string): Promise<AddressData> => {
    const response = await fetch(`https://blockstream.info/api/${path}`);
    return response.json();
  };

  static getAddressesAnalysis = (addressesData: AddressData[]) => {
    return addressesData.reduce<{
      nextUnusedAddress: null | string;
      balance: number;
      pendingBalance: number;
    }>(
      (acc, addressData) => {
        acc.balance =
          acc.balance +
          addressData.chain_stats.funded_txo_sum -
          addressData.chain_stats.spent_txo_sum;

        acc.pendingBalance =
          acc.pendingBalance +
          addressData.mempool_stats.funded_txo_sum -
          addressData.mempool_stats.spent_txo_sum;

        if (
          addressData.chain_stats.tx_count === 0 &&
          addressData.mempool_stats.tx_count === 0 &&
          acc.nextUnusedAddress === null
        ) {
          acc.nextUnusedAddress = addressData.address;
        }

        return acc;
      },
      {
        nextUnusedAddress: null,
        balance: 0,
        pendingBalance: 0,
      },
    );
  };

  fetchAddressData = (address: string) => {
    return Esplora.call(`address/${address}`);
  };
}

export const esplora = new Esplora();
