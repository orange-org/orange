/* eslint-disable no-empty */
import * as thunks from "_r/redux/thunks";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Block } from "_t/bitcoindRpcResponses";

export const useSearchHandlers = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void = event => {
    const { value } = event.target;

    setSearchValue(value);
  };

  const history = useHistory();

  const onKeyPress: (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void = async event => {
    if (event.keyCode === 13) {
      let block: Block | null = null;

      try {
        block = await dispatch(thunks.requestBlock(__NONCE__, searchValue));
      } catch (e) {}

      try {
        if (!block) {
          block = await dispatch(
            thunks.requestBlockByHeight(__NONCE__, parseInt(searchValue, 10)),
          );
        }
      } catch (e) {}

      if (block) {
        history.push(`/explorer/${block.height}`);
      }
    }
  };

  return { onChange, onKeyPress, found: true };
};
