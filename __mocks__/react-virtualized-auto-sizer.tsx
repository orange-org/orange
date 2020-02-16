import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";

export default props => {
  return <AutoSizer defaultWidth={100} defaultHeight={100} {...props} />;
};
