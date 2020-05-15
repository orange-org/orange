import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { AppBar } from "./AppBar/AppBar";
import { Drawer } from "./Drawer/Drawer";

export const Frame: React.FC = ({ children }) => {
  const a = useAtomicCss();

  return (
    <div className={a("displayFlex")}>
      <Drawer />

      <div id="page-wrapper">
        <AppBar />
        {children}
      </div>
    </div>
  );
};
