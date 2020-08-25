import React from "react";
import { Page } from "src/App/common/Page";

export const WalletCreateConfirm: React.FC<{ mnemonic: string }> = () => (
  <Page title="Confirm Secret">
    <label htmlFor="okIWroteThisDown">
      <input type="checkbox" name="okIWroteThisDown" id="okIWroteThisDown" />I
      wrote this down
    </label>
    <label htmlFor="orangeDoesNotStoreSecretPhrase">
      <input
        type="checkbox"
        name="orangeDoesNotStoreSecretPhrase"
        id="orangeDoesNotStoreSecretPhrase"
      />
      I understand that Orange does not store this secret phrase for me
    </label>
  </Page>
);
