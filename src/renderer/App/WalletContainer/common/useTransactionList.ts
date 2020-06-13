import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Thunks } from "_r/redux/Thunks";
import { WalletTransactionList } from "_t/RpcResponses";

export const useTransactionList = () => {
  const { walletName } = useParams();
  const [
    transactionList,
    setTransactionList,
  ] = useState<WalletTransactionList | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      const transactionList_ = await dispatch(
        Thunks.listTransactions(__NONCE__, walletName!, 5000),
      );

      setTransactionList(transactionList_);
    };

    request();
  }, [dispatch, walletName]);

  return transactionList;
};
