import React, { useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { cn } from "src/cn";
import s from "src/styles.css";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Icon } from "../common/Icon";

const Button: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = p => (
  <button
    type="button"
    {...cn(
      s.borderNone,
      s.padding0,
      s.fontWeightLighter,
      s.displayFlex,
      s.alignItemsCenter,
    )}
    {...p}
  />
);

export const AppBarTitle: React.FC = props => {
  const appBarPortalEl = useRef(document.getElementById("appBarPortal"));

  if (!appBarPortalEl.current) {
    return null;
  }

  return createPortal(props.children, appBarPortalEl.current);
};

export const AppBar = () => (
  <div {...cn(s.displayFlex, s.justifyContentCenter, s.alignItemsCenter)}>
    <Link to="/menu" {...cn(s.flex_2)}>
      <Button>
        <Icon IconType={FiMenu} />
      </Button>
    </Link>

    <h1
      {...cn(s.margin0, s.flex1, s.textAlignCenter, s.fontSize120Percent)}
      id="appBarPortal"
    />

    <div {...cn(s.flex_2)} />
  </div>
);
