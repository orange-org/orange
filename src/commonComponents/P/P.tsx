import React from "react";
import styles from "src/styles.css";
import { cn } from "src/cn";

export const P: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>> = p => (
  <p
    {...p}
    {...cn(styles.lineHeight6, styles.marginBottom0, p.className || "")}
  />
);
