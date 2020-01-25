import { Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useCommonStyles } from "_r/commonStyles";
import { Na } from "_t/typeHelpers";
import { useStyles } from "./StatusBarStyles";

export const Details: React.FC = props => {
  const s = useStyles();
  const cs = useCommonStyles();

  return (
    <div className={clsx(cs.displayTable, s.details)}>{props.children}</div>
  );
};

export const Record: React.FC<{
  name: string;
  value: string | number | Na;
}> = props => {
  const cs = useCommonStyles();

  return (
    <div className={cs.displayTableRow}>
      <div className={cs.displayTableCell}>
        <Typography className={cs.fontWeight500} align="right">
          {props.name}
        </Typography>
      </div>
      <div className={cs.displayTableCell}>
        <Typography>{props.value ?? "N/A"}</Typography>
      </div>
    </div>
  );
};
