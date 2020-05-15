import { Toolbar } from "@material-ui/core";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { SearchBox } from "./SearchBox/SearchBox";

export const AppBar: React.FC = () => {
  const a = useAtomicCss();

  return (
    <Toolbar className={a("positionFixed")}>
      <SearchBox />
    </Toolbar>
  );
};
