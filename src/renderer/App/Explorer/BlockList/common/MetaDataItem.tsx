import React, { ReactText } from "react";
import { SvgIcon, Typography, Tooltip } from "@material-ui/core";

import { Null } from "_t/typeHelpers";
import { useAtomicCss } from "_r/useAtomicCss";

export const MetaDataItem: React.FC<{
  icon: typeof SvgIcon;
  text: ReactText | Null;
  otherClasses?: Parameters<ReturnType<typeof useAtomicCss>>;
  tooltipTitle?: string;
}> = props => {
  const a = useAtomicCss();
  const otherClasses = props.otherClasses || [];

  const content = (
    <div className={a("displayFlex", "alignItemsCenter", "widthFitContent")}>
      <div className={a("lineHeight0", "colorHint")}>
        <props.icon fontSize="small" />
      </div>
      <div className={a("marginLeft01")}>
        <Typography>{props.text}</Typography>
      </div>
    </div>
  );

  return (
    <div className={a("minWidth50%", "paddingTop2", ...otherClasses)}>
      {props.tooltipTitle ? (
        <Tooltip arrow placement="right-start" title={props.tooltipTitle}>
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </div>
  );
};
