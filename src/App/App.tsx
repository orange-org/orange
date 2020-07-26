import React, { StrictMode } from "react";
import { cn } from "src/cn";
import s from "./styles.css";

// @ts-ignore
import "./global.css";

const App = () => (
  <StrictMode>
    <div {...cn(s.maxWidth400, s.marginY0, s.marginXAuto, s.fontFamilySerif)}>
      <h1
        {...cn(
          s.fontWeightBold,
          s.margin2,
          s.colorGray900,
          s.fontSize150Percent,
        )}
      >
        Orange
      </h1>
    </div>
  </StrictMode>
);

export const getApp = () => App;
