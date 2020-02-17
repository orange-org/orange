import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import { useCcn } from "_r/commonStyles";
import { useSearchBoxStyles } from "./SearchBoxStyles";
import { useSearchHandlers } from "./SearchBoxHooks";

export const SearchBox: React.FC = () => {
  const cn = useSearchBoxStyles();
  const ccn = useCcn();
  const { onKeyUp, onChange } = useSearchHandlers();

  return (
    <div
      className={ccn(
        "positionRelative",
        "borderRadiusShape",
        "backgroundColorBlackFade01",
        "hoverBackgroundColorBlackFade012",
        "marginRight2",
        "marginLeft10",
        "widthAuto",
      )}
    >
      <div
        className={ccn(
          "width11",
          "colorHint",
          "height100%",
          "positionAbsolute",
          "pointerEventsNone",
          "displayFlex",
          "alignItemsCenter",
          "justifyContentCenter",
        )}
      >
        <Search />
      </div>
      <InputBase
        onChange={onChange}
        onKeyUp={onKeyUp}
        type="search"
        placeholder="Search block height or block hash..."
        classes={{
          root: cn.inputRoot,
          input: cn.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};
