import { BlockchainService } from "./BlockchainService";

export class Esplora extends BlockchainService {
  private static call = async (path: string) => {
    const response = await fetch(`https://blockstream.info/api/${path}`);
    return response.json();
  };

  fetchAddressStats = (address: string) => {
    return Esplora.call(`address/${address}`);
  };

  fetchAddressUtxos = (address: string) => {
    return Esplora.call(`address/${address}/utxo`);
  };
}

export const esplora = new Esplora();
