import React, { useState } from "react";
import { cn } from "src/cn";
import styles from "src/styles.css";

export const Textarea: React.FC<React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & { label: string }> = ({ label, onBlur, onFocus, ...p }) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <label
      htmlFor={p.id}
      {...cn(
        styles.width100Percent,
        styles.backgroundColorDarkerBackground,
        styles.displayFlex,
        styles.flexDirectionColumn,
        styles.paddingLeftRight3,
        styles.paddingTopBottom2,
        styles.borderRadius1,
        styles.borderWidth3px,
        styles.borderBottomStyleSolid,
        isFocused ? styles.borderColorButton : styles.borderColorInactiveBorder,
      )}
    >
      <span
        {...cn(
          styles.fontSize90Percent,
          isFocused ? styles.colorButton : styles.colorText,
        )}
      >
        {label}
      </span>

      <div {...cn(styles.marginTop1)} />

      <textarea
        {...cn(
          styles.marginTop1,
          styles.backgroundColorDarkerBackground,
          styles.borderNone,
          styles.resizeNone,
          styles.outlineNoneOnFocus,
        )}
        name={p.id}
        id={p.id}
        onBlur={(...args) => {
          onBlur?.(...args);
          setFocused(false);
        }}
        onFocus={(...args) => {
          onFocus?.(...args);
          setFocused(true);
        }}
        {...p}
      />
    </label>
  );
};
