import { useParams } from "react-router-dom";

export const useWalletName = () => {
  const { walletName } = useParams();

  return walletName;
};
