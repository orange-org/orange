import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { AppBar } from "../AppBar/AppBar";

export const Frame: React.FC = ({ children }) => {
  const a = useAtomicCss();

  return (
    <>
      <AppBar />
      {children}
    </>
  );
};
