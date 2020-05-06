import { InputBase, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "_r/redux/actions";
import { useAtomicCss, getAtomicCssAndStyleGroups } from "_r/useAtomicCss";
import { testIds } from "_tu/testIds";
import { useSearchHandlers } from "./SearchBoxHooks";
import { useSearchBoxStyles } from "./SearchBoxStyles";

export const SearchBox: React.FC = () => {
  const classNames = useSearchBoxStyles();
  const a = useAtomicCss();
  const { onKeyUp, onChange } = useSearchHandlers();
  const inputRef = useRef<HTMLInputElement>(null);
  const focusRequested = useSelector(state => state.requestSearchBoxFocus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (focusRequested) {
      inputRef.current?.focus();
      dispatch(actions.requestSearchBoxFocus(null));
    }
  });

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
        inputRef={inputRef}
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
