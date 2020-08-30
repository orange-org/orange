import React from "react";
import { MdAddCircle, MdCloudDownload } from "react-icons/md";
import { cn } from "src/cn";
import { LinkButton } from "src/commonComponents/LinkButton/LinkButton";
import styles from "src/styles.css";
import { Icon } from "../common/Icon";
import { Page } from "../common/Page";

export const Home = () => (
  <Page title="Orange">
    <div
      {...cn(
        styles.displayFlex,
        styles.flexDirectionColumn,
        styles.alignItemsCenter,
        styles.justifyContentCenter,
      )}
    >
      <div {...cn(styles.marginTop10)} />

      <LinkButton to="/wallet/create" {...cn(styles.width50)}>
        <Icon IconType={MdAddCircle} iconContextValue={{ size: "1.1em" }} />
        <div {...cn(styles.marginLeft2)} />
        Create new wallet
      </LinkButton>

      <div {...cn(styles.marginTop10)} />

      <LinkButton to="/wallet/import" {...cn(styles.width50)}>
        <Icon IconType={MdCloudDownload} iconContextValue={{ size: "1.1em" }} />
        <div {...cn(styles.marginLeft2)} />
        Import wallet
      </LinkButton>
    </div>
  </Page>
);
