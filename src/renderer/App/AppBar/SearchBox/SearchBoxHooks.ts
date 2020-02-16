import { useState } from "react";
import { useHistory } from "react-router-dom";
import { rpcService } from "_r/rpcClient/rpcService";
import { Block } from "_t/bitcoindRpcResponses";
import { RPC_SERVER_ERROR_CODES } from "_c/constants";

export const useSearchHandlers = () => {
  const [searchValue, setSearchValue] = useState("");

  const onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void = event => {
    const { value } = event.target;

    setSearchValue(value);
  };

  const history = useHistory();

  const onKeyUp: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void = async event => {
    if (event.keyCode === 13) {
      let block: Block | null = null;
      const ignoreExpectedRpcErrors = async (fn: Function) => {
        try {
          return await fn();
        } catch (error) {
          /* istanbul ignore if */
          if (
            error.code !== RPC_SERVER_ERROR_CODES.rpcInvalidParameter &&
            error.code !== RPC_SERVER_ERROR_CODES.rpcMiscError
          ) {
            throw error;
          }

          return null;
        }
      };

      block = await ignoreExpectedRpcErrors(() =>
        rpcService.requestBlock(__NONCE__, searchValue),
      );

      if (!block) {
        block = await ignoreExpectedRpcErrors(() =>
          rpcService.requestBlockByHeight(__NONCE__, parseInt(searchValue, 10)),
        );
      }

      if (block) {
        history.push(`/explorer/${block.height}`);
      }
    }
  };

  return { onChange, onKeyUp };
};
