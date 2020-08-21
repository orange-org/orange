import { BlockchainService, AddressData } from "./BlockchainService";

class Esplora extends BlockchainService {
  private static call = async (path: string): Promise<AddressData> => {
    const response = await fetch(`https://blockstream.info/api/${path}`);
    return response.json();
  };

  fetchAddressData = (address: string) => {
    return Esplora.call(`address/${address}`);
  };
}

export const esplora = new Esplora();
