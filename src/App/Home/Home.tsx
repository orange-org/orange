import React from "react";
import { Link } from "react-router-dom";

import s from "src/styles.css";
import { cn } from "src/cn";
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

      <Link to="/wallet/create">
        <button {...cn(s.width50)} type="button">
          Create new wallet
        </button>
      </Link>

      <div {...cn(s.marginTop10)} />

      <Link to="/wallet/import">
        <button {...cn(s.width50)} type="button">
          Import wallet
        </button>
      </Link>
    </div>
  </Page>
);
