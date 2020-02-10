import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import { useSearchBoxStyles } from "./SearchBoxStyles";
import { useSearchHandlers } from "./SearchBoxHooks";

export const SearchBox: React.FC = () => {
  const cn = useSearchBoxStyles();
  const { onKeyUp, onChange } = useSearchHandlers();

  return (
    <div className={cn.search}>
      <div className={cn.searchIcon}>
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
