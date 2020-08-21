import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { WalletThunks } from "src/data/WalletThunks";

export const useHandleCreateWallet = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (mnemonic: string) => {
    dispatch(WalletThunks.setId(mnemonic));
    dispatch(WalletThunks.setMasterPublicKey(mnemonic));

    history.push("/wallet");
  };
};
