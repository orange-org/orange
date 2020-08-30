import React from "react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { cn } from "src/cn";
import s from "src/styles.css";
import { Icon } from "./Icon";

export const Page: React.FC<{
  title: string;
  leftLink?: React.ReactNode;
}> = p => (
  <div
    {...cn(
      s.maxWidth600px,
      s.marginXAuto,
      s.borderWidth1px,
      s.borderColorBorder,
      s.borderLeftStyleSolid,
      s.borderRightStyleSolid,
      s.minHeight100vh,
    )}
  >
    <nav
      {...cn(
        s.displayFlex,
        s.justifyContentCenter,
        s.alignItemsCenter,
        s.padding3,
        s.borderWidth1px,
        s.borderColorBorder,
        s.borderBottomStyleSolid,
      )}
    >
      <div {...cn(s.flex_2)}>
        {p.leftLink || (
          <Link to="/menu">
            <Icon IconType={MdMenu} iconContextValue={{ size: "25px" }} />
          </Link>
        )}
      </div>

      <h1 {...cn(s.margin0, s.flex1, s.textAlignCenter, s.fontSize120Percent)}>
        {p.title}
      </h1>

      <div {...cn(s.flex_2)} />
    </nav>

    <div {...cn(s.padding4)}>{p.children}</div>
  </div>
);
