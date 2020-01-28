import React from "react";
import { version } from "../../../package.json";

export const SplashScreen: React.FC<{ initMessage: string }> = props => {
  return (
    <div>
      <div>
        <div>
          <div>Orange</div>
          <div>Version {version}</div>
        </div>
      </div>

      <div>
        <div>{props.initMessage}</div>
      </div>
    </div>
  );
};
