import * as React from "react";
import * as ReactDOM from "react-dom";
// import * as electron from "electron";

// console.log("electron", electron);

const Index = () => {
  return <div style={{ background: "#e8e8e8" }}>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("app"));
