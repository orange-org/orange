import React from "react";
import { Link } from "react-router-dom";

import s from "src/styles.css";
import { cn } from "src/cn";
import { AppBarPortal } from "../AppBar/AppBar";

export const Home = () => (
  <>
    <AppBarPortal>Orange</AppBarPortal>
    <div
      {...cn(
        s.displayFlex,
        s.flexDirectionColumn,
        s.alignItemsCenter,
        s.marginTop10,
      )}
    >
      <p>
        <Link to="/wallet/open">
          <button {...cn(s.width50)} type="button">
            Open wallet
          </button>
        </Link>
      </p>
    </div>
  </>
);
