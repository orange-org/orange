import React from "react";
import { cn } from "src/cn";
import { LinkButton } from "src/commonComponents/LinkButton/LinkButton";
import s from "src/styles.css";
import { Page } from "../common/Page";

export const Home = () => (
  <Page title="Orange">
    <div
      {...cn(
        s.displayFlex,
        s.flexDirectionColumn,
        s.alignItemsCenter,
        s.justifyContentCenter,
      )}
    >
      <div {...cn(s.marginTop10)} />

      <LinkButton to="/wallet/create" {...cn(s.width50)}>
        Create new wallet
      </LinkButton>

      <div {...cn(s.marginTop10)} />

      <LinkButton to="/wallet/import" {...cn(s.width50)}>
        Import wallet
      </LinkButton>
    </div>
  </Page>
);
