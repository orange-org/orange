// @ts-ignore
import "src/global.css";

import React, { StrictMode } from "react";
import { cn } from "src/cn";
import s from "src/styles.css";
import { TransactionList } from "./TransactionList/TransactionList";

const App = () => (
  <StrictMode>
    <div {...cn(s.maxWidth400, s.marginY0, s.marginXAuto, s.fontFamilySerif)}>
      <h1
        {...cn(
          s.fontWeightBold,
          s.margin2,
          s.colorGray900,
          s.fontSize150Percent,
          s.marginLeft0,
        )}
      >
        Orange
      </h1>
      <TransactionList />
    </div>
  </StrictMode>
);

export const getApp = () => App;
