import React, { useEffect, useState } from "react";
import { Wallet } from "src/data/Wallet";
import { useHandleCreateWallet } from "../common/useHandleCreateWallet";

const useGenerateMnemonic = () => {
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  useEffect(() => {
    setMnemonic(Wallet.generateMnemonic());
  }, []);

  return mnemonic;
};

export const CreateWallet = () => {
  const mnemonic = useGenerateMnemonic();
  const handleCreateWallet = useHandleCreateWallet();

  return mnemonic ? (
    <>
      <p>
        Your secret phrase has been generated. You must save it some where safe.
        If you lose it, you lose your coins. If somebody sees it, they can steal
        your coins.
      </p>

      <blockquote>
        <code>{mnemonic}</code>
      </blockquote>

      <button type="button" onClick={() => handleCreateWallet(mnemonic)}>
        OK, I wrote this down!
      </button>
    </>
  ) : (
    <p>Creating wallet...</p>
  );
};
