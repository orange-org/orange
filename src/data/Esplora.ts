import { BlockchainService } from "./BlockchainService";

export class Esplora extends BlockchainService {
  private static call = async (path: string) => {
    const response = await fetch(`https://blockstream.info/api/${path}`);
    return response.json();
  };

  fetchAddressStats = (address: string) => Esplora.call(`address/${address}`);

  fetchAddressUtxos = (address: string) =>
    Esplora.call(`address/${address}/utxo`);

  fetchAddressTxs = (address: string) => Esplora.call(`address/${address}/txs`);
}

export const esplora = new Esplora();
