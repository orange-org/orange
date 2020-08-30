import React from "react";

import s from "src/styles.css";
import { cn } from "src/cn";

export const WalletOpen = () => (
  <>
    <div {...cn(s.marginTop10)}>
      <label htmlFor="walletOpenTextarea">
        Enter your seed phrase or master public key
        <textarea
          {...cn(s.marginTop2)}
          name="walletOpenTextarea"
          id="walletOpenTextarea"
          cols={30}
          rows={10}
        />
      </label>

      <div {...cn(s.displayFlex)}>
        <div {...cn(s.flex1)}>
          <button type="button" {...cn(s.borderNone)}>
            Make a new key
          </button>
        </div>
        <button type="button" disabled>
          Open
        </button>
      </div>
    </div>
  </>
);
