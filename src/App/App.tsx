import React, { StrictMode } from "react";
import { cn } from "src/cn";
import styles from "./styles.css";

const App = () => (
  <StrictMode>
    <div {...cn(styles.colorRed)}>HOT APP!</div>
  </StrictMode>
);

export const getApp = () => App;
