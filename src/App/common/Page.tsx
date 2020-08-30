import React from "react";

import s from "src/styles.css";
import { cn } from "src/cn";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Icon } from "./Icon";

export const Page: React.FC<{
  title: string;
  leftLink?: React.ReactNode;
}> = p => (
  <div>
    <nav {...cn(s.displayFlex, s.justifyContentCenter, s.alignItemsCenter)}>
      <div {...cn(s.flex_2)}>
        {p.leftLink || (
          <Link to="/menu">
            <Icon IconType={FiMenu} />
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
