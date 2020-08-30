import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "src/styles.css";
import { cn } from "src/cn";

export const LinkText: React.FC<LinkProps> = p => (
  <Link
    {...cn(
      styles.displayFlex,
      styles.alignItemsCenter,
      styles.textDecorationNone,
      styles.colorText,
      styles.colorButtonOnHover,
    )}
    {...p}
  />
);
