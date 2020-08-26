import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { WalletThunks } from "src/data/WalletThunks";

export const useSetInitialMasterPublicKey = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return async (masterPublicKey: string) => {
    await dispatch(WalletThunks.setMasterPublicKey(masterPublicKey.trim()));

    history.push("/wallet");
  };
};
