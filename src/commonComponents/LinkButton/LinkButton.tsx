import React from "react";
import styles from "src/styles.css";
import { cn } from "src/cn";
import { Link, LinkProps } from "react-router-dom";
import { Icon } from "src/App/common/Icon";
import { buttonClasses } from "../Button/Button";

export const LinkButton: React.FC<LinkProps> = p => (
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
