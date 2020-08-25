import React from "react";

import s from "src/styles.css";
import { cn } from "src/cn";
import { Link } from "react-router-dom";

export const Menu = () => (
  <div {...cn(s.marginTop10)}>
    <h2>
      <Link to="/wallet">Wallet</Link>
    </h2>

    <h2>
      <Link to="/settings">Settings</Link>
    </h2>
  </div>
);
