import React, { useState } from "react";
import { useHandleCreateWallet } from "../common/useHandleCreateWallet";
import { useMnemonicTextarea } from "../common/useMnemonicTextarea";

export const ImportWallet = () => {
  const { mnemonicTextarea, mnemonic } = useMnemonicTextarea();
  const handleCreateWallet = useHandleCreateWallet();

  return (
    <>
      <h2>Import wallet</h2>
      {mnemonicTextarea}
      <button type="button" onClick={() => handleCreateWallet(mnemonic)}>
        Import
      </button>
    </>
  );
};
