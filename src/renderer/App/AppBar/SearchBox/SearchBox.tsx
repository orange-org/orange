import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { testIds } from "_tu/testIds";
import { useSearchBoxStyles } from "./SearchBoxStyles";
import { useSearchHandlers } from "./SearchBoxHooks";

export const SearchBox: React.FC = () => {
  const classNames = useSearchBoxStyles();
  const a = useAtomicCss();
  const { onKeyUp, onChange } = useSearchHandlers();

  return (
    <div
      className={a(
        "positionRelative",
        "borderRadiusShape",
        "backgroundColorBlackFade01",
        "hoverBackgroundColorBlackFade012",
        "marginRight02",
        "marginLeft10",
        "widthAuto",
      )}
    >
      <div
        className={a(
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
        inputProps={{
          "data-testid": testIds.searchInputField,
        }}
        onChange={onChange}
        onKeyUp={onKeyUp}
        type="search"
        placeholder="Search block height or block hash..."
        classes={{
          root: classNames.inputRoot,
          input: classNames.inputInput,
        }}
      />
    </div>
  );
};
