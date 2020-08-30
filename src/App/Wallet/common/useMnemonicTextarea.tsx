import React, { useState } from "react";

export const useMnemonicTextarea = () => {
  const [mnemonic, setMnemonic] = useState<string>("");

  return {
    mnemonicTextarea: (
      <textarea
        name="mnemonic"
        id="mnemonic"
        cols={30}
        rows={4}
        value={mnemonic}
        onChange={event => setMnemonic(event.target.value)}
      />
    ),
    mnemonic,
    setMnemonic,
  };
};
