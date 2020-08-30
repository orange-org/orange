import React from "react";
import { Link } from "react-router-dom";
import { BackButton } from "src/commonComponents/BackButton/BackButton";
import { MdAccountBalanceWallet, MdSettings } from "react-icons/md";
import styles from "src/styles.css";
import { cn } from "src/cn";
import { LinkText } from "src/commonComponents/LinkText/LinkText";
import { Page } from "../common/Page";
import { Icon } from "../common/Icon";

export const Menu = () => (
  <Page title="Menu" leftLink={<BackButton />}>
    <h1>
      <LinkText to="/wallet">
        <Icon IconType={MdAccountBalanceWallet} />
        <div {...cn(styles.marginLeft2)} />
        Wallet
      </LinkText>
    </h1>

    <div {...cn(styles.marginTop10)} />

    <h1>
      <LinkText to="/settings">
        <Icon IconType={MdSettings} />
        <div {...cn(styles.marginLeft2)} />
        Settings
      </LinkText>
    </h1>
  </Page>
);
