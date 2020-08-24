import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { WalletThunks } from "src/data/WalletThunks";

export const useHandleCreateWallet = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return async (mnemonic: string) => {
    await dispatch(WalletThunks.setMasterPublicKey(mnemonic));

    history.push("/wallet");
  };
};
