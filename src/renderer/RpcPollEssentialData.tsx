import { useDispatch } from "react-redux";
import * as actions from "_r/redux/actions";
import { usePolling } from "./hooks";

export const RpcPollEssentialData: React.FC = () => {
  const dispatch = useDispatch();

  usePolling(() => {
    dispatch(actions.requestBlockchainInfoAndBestBlock(__NONCE__));
    dispatch(actions.requestPeerInfo(__NONCE__));
  }, 1000);

  return null;
};
