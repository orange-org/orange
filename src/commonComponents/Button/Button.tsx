import React from "react";
import styles from "src/styles.css";
import { cn } from "src/cn";

export const buttonClasses = [
  styles.backgroundColorButton,
  styles.colorButtonFont,
  styles.padding2,
  styles.borderColorButton,
  styles.borderWidth1px,
  styles.borderStyleSolid,
  styles.borderRadiusRounded,
  styles.opacity0_5ForDisabled,
];

export const Button: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = p => (
  // eslint-disable-next-line react/button-has-type
  <button {...p} {...cn(...buttonClasses, p.className || "")} />
);
