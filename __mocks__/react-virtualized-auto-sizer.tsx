import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";

export default props => (
  <AutoSizer defaultWidth={100} defaultHeight={100} {...props} />
);
