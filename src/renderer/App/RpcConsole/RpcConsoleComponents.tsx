import { Typography } from "@material-ui/core";
import React from "react";
import { useCommonStyles } from "_r/commonStyles";
import { Null } from "_t/typeHelpers";

type Row = [string, string | number | Null];

export const renderRow = (row: Row) => {
  const [name, value] = row;
  const cs = useCommonStyles();

  return (
    <div className={cs.displayTableRow} key={name}>
      <div className={cs.displayTableCell}>
        <Typography>{name}</Typography>
      </div>
      <div className={cs.displayTableCell}>
        <Typography>{value ?? "N/A"}</Typography>
      </div>
    </div>
  );
};

export const Section: React.FC<{
  title: string;
  rows: Row[];
}> = props => {
  const cs = useCommonStyles();

  return (
    <>
      <Typography variant="h3" className="heading">
        {props.title}
      </Typography>
      <div className={cs.displayTable}>{props.rows.map(renderRow)}</div>
    </>
  );
};
