import React from "react";
import { BackButton } from "src/commonComponents/BackButton/BackButton";
import { cn } from "src/cn";
import styles from "src/styles.css";
import { Page } from "../common/Page";

export const Settings = () => (
  <Page title="Settings" leftLink={<BackButton />}>
    <label
      htmlFor="settingsUseTestnet"
      {...cn(styles.displayFlex, styles.alignItemsCenter)}
    >
      <input
        type="checkbox"
        name="useTestnet"
        id="settingsUseTestnet"
        {...cn(styles.transformScale1_2)}
      />
      <div {...cn(styles.marginLeft2)} />
      <span>Use testnet</span>
    </label>
  </Page>
);
