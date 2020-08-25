import React from "react";
import { Page } from "src/App/common/Page";
import styles from "src/styles.css";
import { cn } from "src/cn";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { Icon } from "src/App/common/Icon";

export const WalletCreateConfirm: React.FC<{ mnemonic: string }> = () => (
  <Page title="Confirm Secret">
    <p>
      Enter your secret phrase below to confirm that you&apos;ve noted it down
      correctly
    </p>

    <textarea name="mnemonicTextarea" id="mnemonicTextarea" rows={5} />

    <p>
      Orange will not store your secret and will ask you again for it before you
      can send money out.
    </p>

    <label htmlFor="orangeDoesNotStoreSecretPhrase" {...cn(styles.displayFlex)}>
      <span>
        <input
          {...cn(styles.transformScale1_5)}
          type="checkbox"
          name="orangeDoesNotStoreSecretPhrase"
          id="orangeDoesNotStoreSecretPhrase"
        />
      </span>
      <span {...cn(styles.marginLeft3)}>
        I understand that Orange does not store this secret phrase and that I
        will need it to send money out.
      </span>
    </label>

    <div {...cn(styles.marginTop10)} />

    <div {...cn(styles.displayFlex, styles.alignItemsCenter)}>
      <Link to="/wallet/create" {...cn(styles.flex1)}>
        <button
          {...cn(
            styles.borderNone,
            styles.displayFlex,
            styles.alignItemsCenter,
            styles.paddingLeft0,
          )}
          type="button"
        >
          <Icon IconType={FiChevronLeft} />
          Go back
        </button>
      </Link>

      <Link to="/wallet">
        <button type="button" disabled>
          Open wallet
        </button>
      </Link>
    </div>
  </Page>
);
