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
      value={{
        color: "#14171a",
        size: "1.5em",
        style: { color: undefined },
        ...p.iconContextValue,
      }}
    >
      <IconType />
    </IconContext.Provider>
  );
};
