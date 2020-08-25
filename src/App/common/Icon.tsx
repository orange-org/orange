import React from "react";
import { IconContext } from "react-icons";
import { IconType as TIconType } from "react-icons/lib";

export const Icon: React.FC<{
  IconType: TIconType;
  iconContextValue?: IconContext;
}> = p => {
  const { IconType } = p;

  return (
    <IconContext.Provider
      value={{ color: "#c2c2c2", size: "1.5em", ...p.iconContextValue }}
    >
      <IconType />
    </IconContext.Provider>
  );
};
