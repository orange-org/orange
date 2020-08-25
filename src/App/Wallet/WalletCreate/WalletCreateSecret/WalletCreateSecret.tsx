import React from "react";
import { cn } from "src/cn";
import s from "src/styles.css";
import { Link } from "react-router-dom";
import { Page } from "src/App/common/Page";

export const WalletCreateSecret: React.FC<{
  mnemonic: string;
}> = p => (
  <Page title="Your Secret">
    <p>
      Below is the secret phrase to unlock your money. You must keep it safe. If
      you lose it, you lose your money. If somebody sees it, they can steal your
      money. <strong>Orange does not store this secret</strong>.
    </p>

    <blockquote>
      <code>{p.mnemonic}</code>
    </blockquote>

    <div {...cn(s.marginTop10)} />

    <div {...cn(s.displayFlex, s.justifyContentFlexEnd)}>
      <Link to="/wallet/create/confirm">
        <button type="button">OK</button>
      </Link>
    </div>
  </Page>
);
