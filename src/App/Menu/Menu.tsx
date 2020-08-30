import React from "react";
import { Link } from "react-router-dom";
import { BackButton } from "src/commonComponents/BackButton/BackButton";
import { Page } from "../common/Page";

export const Menu = () => (
  <Page title="Menu" leftLink={<BackButton />}>
    <h2>
      <Link to="/wallet">Wallet</Link>
    </h2>

    <h2>
      <Link to="/settings">Settings</Link>
    </h2>
  </Page>
);
