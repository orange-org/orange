import { useState } from "react";
import { useHistory } from "react-router-dom";
import { rpcService } from "_r/rpcClient/rpcService";
import { BITCOIN_CORE_RPC_ERROR } from "_c/constants";

const hashRegex = /[0-9a-fA-F]{64}/;

export const useSearchHandlers = () => {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  const onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void = event => {
    const { value } = event.target;

    setSearchValue(value);
  };

  const onKeyUp: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void = async event => {
    if (event.keyCode === 13) {
      const ignoreExpectedRpcErrors = async <
        T extends { (...args: any[]): any }
      >(
        fn: T,
      ): Promise<ReturnType<T> | null> => {
        try {
          return await fn();
        } catch (error) {
          /* istanbul ignore if */
          if (
            error.code !== BITCOIN_CORE_RPC_ERROR.invalidParameter &&
            error.code !== BITCOIN_CORE_RPC_ERROR.miscError &&
            error.code !== BITCOIN_CORE_RPC_ERROR.blockNotFound
          ) {
            throw error;
          }

          return null;
        }
      };

      let block = await ignoreExpectedRpcErrors(() =>
        rpcService.requestBlock(__NONCE__, searchValue),
      );

      if (!block && !hashRegex.test(searchValue)) {
        block = await ignoreExpectedRpcErrors(() =>
          rpcService.requestBlockByHeight(__NONCE__, parseInt(searchValue, 10)),
        );
      }

      if (block) {
        history.push(`/explorer/${block.height}`);
        return;
      }

      const transaction = await ignoreExpectedRpcErrors(() =>
        rpcService.requestRawTransaction(__NONCE__, searchValue),
      );

      /* istanbul ignore else: until we add UX for a "no results" search */
      if (transaction) {
        block = await rpcService.requestBlock(__NONCE__, transaction.blockhash);
        history.push(`/explorer/${block.height}/${transaction.txid}`);
      }
    }
  };

  return { onChange, onKeyUp };
};
