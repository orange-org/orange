import { Paper } from "@material-ui/core";
import React, { ReactElement } from "react";
import { useLoadingAwareTypography } from "_r/App/hooks/useLoadingAwareTypography";
import { useAtomicCss } from "_r/useAtomicCss";

export const OtherDetails: React.FC<{
  data: [string, ReactElement][];
  isLoading?: boolean;
}> = props => {
  const { data, isLoading } = props;
  const a = useAtomicCss();
  const Typography = useLoadingAwareTypography(!!isLoading);

  return (
    <div className={a("marginTop05")}>
      <Typography variant="h2" isStatic>
        Other details
      </Typography>

      <Paper
        className={a("marginTop02", "padding2", "displayFlex", "flexWrapWrap")}
      >
        {data.map(([name, value]) => (
          <div
            key={name}
            className={a(
              "displayFlex",
              "alignItemsCenter",
              "flexShrink0",
              "marginY02",
              "marginX04",
            )}
          >
            <div>
              <Typography isStatic className={a("fontWeight500")}>
                {name}
              </Typography>
            </div>
            <div className={a("marginLeft01")}>
              <Typography component="div">{value}</Typography>
            </div>
          </div>
        ))}
      </Paper>
    </div>
  );
};
