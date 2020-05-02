import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";

const MockedAutoSizer = props => (
  <AutoSizer defaultWidth={100} defaultHeight={100} {...props} />
);

export default MockedAutoSizer;
