import React from "react";

import s from "src/styles.css";
import { cn } from "src/cn";
import { AppBarTitle } from "../AppBar/AppBar";

export const Page: React.FC<{ title: string }> = p => (
  <div {...cn(s.marginTop10)}>
    <AppBarTitle>{p.title}</AppBarTitle>
    {p.children}
  </div>
);
