import React, { useState } from "react";
import { useHandleCreateWallet } from "../common/useHandleCreateWallet";

export const ImportWallet = () => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const handleCreateWallet = useHandleCreateWallet();

  return (
    <>
      <h2>Import wallet</h2>
      <textarea
        name="mnemonic"
        id="mnemonic"
        cols={30}
        rows={4}
        value={mnemonic}
        onChange={event => setMnemonic(event.target.value)}
      />
      <button type="button" onClick={() => handleCreateWallet(mnemonic)}>
        Import
      </button>
    </>
  );
};
