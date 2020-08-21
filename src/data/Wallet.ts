import * as bip39 from "bip39";
import * as bip32 from "bip32";
import * as bs58 from "bs58check";
import createHash from "create-hash";

export class Wallet {
  static generateMnemonic = () => bip39.generateMnemonic();

  static getId = (mnemonic: string) =>
    createHash("sha256")
      .update(mnemonic)
      .digest()
      .toString("hex");

  static getMasterPublicKey = async (mnemonic: string) => {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = bip32.fromSeed(seed);
    const path = "m/84'/0'/0'";
    const child = root.derivePath(path).neutered();
    const xpub = child.toBase58();

    // Convert to zpub
    const xpubBuffer = bs58.decode(xpub);
    const xpubBufferWithoutVersion = xpubBuffer.slice(4);
    const zpubBuffer = Buffer.concat([
      Buffer.from("04b24746", "hex"),
      xpubBufferWithoutVersion,
    ]);
    const zpub = bs58.encode(zpubBuffer);

    return zpub;
  };
}
