import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { AppBar } from "./AppBar/AppBar";
import { Drawer } from "./Drawer/Drawer";

export const Frame: React.FC = ({ children }) => {
  const a = useAtomicCss();

  return (
    <div className={a("displayFlex", "height100%")}>
      <Drawer />

      <div className={a("flexGrow1")}>
        <AppBar />
        <div className={a("height100%", "overflowScroll")}>{children}</div>
      </div>
    </div>
  );
};
