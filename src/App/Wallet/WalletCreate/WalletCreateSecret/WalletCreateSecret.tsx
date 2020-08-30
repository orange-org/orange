import React from "react";
import { Page } from "src/App/common/Page";
import { cn } from "src/cn";
import { BackButton } from "src/commonComponents/BackButton/BackButton";
import { LinkButton } from "src/commonComponents/LinkButton/LinkButton";
import { P } from "src/commonComponents/P/P";
import styles from "src/styles.css";

export const WalletCreateSecret: React.FC<{
  mnemonic: string;
}> = p => (
  <Page title="Your Secret" leftLink={<BackButton />}>
    <P>
      Below is the secret phrase to unlock your money. You must keep it safe. If
      you lose it, you lose your money. If somebody sees it, they can steal your
      money. <strong>Orange does not store this secret</strong>.
    </P>

    <P
      {...cn(
        styles.backgroundColorDarkerBackground,
        styles.padding4,
        styles.borderRadius4,
      )}
    >
      <code>{p.mnemonic}</code>
    </P>

    <div {...cn(styles.marginTop10)} />

    <div {...cn(styles.displayFlex, styles.justifyContentFlexEnd)}>
      <LinkButton {...cn(styles.width25)} to="/wallet/create/confirm">
        OK
      </LinkButton>
    </div>
  </Page>
);
