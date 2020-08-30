import React from "react";
import { Page } from "src/App/common/Page";
import { cn } from "src/cn";
import { BackButton } from "src/commonComponents/BackButton/BackButton";
import { LinkButton } from "src/commonComponents/LinkButton/LinkButton";
import s from "src/styles.css";

export const WalletCreateSecret: React.FC<{
  mnemonic: string;
}> = p => (
  <Page title="Your Secret" leftLink={<BackButton />}>
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
      <LinkButton to="/wallet/create/confirm">OK</LinkButton>
    </div>
  </Page>
);
