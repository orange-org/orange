import React from "react";
import styles from "src/styles.css";
import { cn } from "src/cn";
import { Link, LinkProps } from "react-router-dom";
import { buttonClasses } from "../Button/Button";

export const LinkButton: React.FC<LinkProps> = p => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <Link
    {...p}
    {...cn(
      ...buttonClasses,
      styles.textAlignCenter,
      styles.textDecorationNone,
      p.className || "",
    )}
  />
);
