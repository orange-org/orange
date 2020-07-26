import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";

export const MetaDataItemsContainer: React.FC<JSX.IntrinsicElements["div"]> = props => {
  const a = useAtomicCss();

  return (
    <div
      className={a("displayFlex", "flexWrapWrap", "marginTop02")}
      {...props}
    />
  );
};
