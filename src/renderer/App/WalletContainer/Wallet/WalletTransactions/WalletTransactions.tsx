import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Thunks } from "_r/redux/Thunks";
import { Poll } from "_r/utils/Poll";
import { Typography } from "@material-ui/core";
import { useTransactionList } from "../common/useTransactionList";
import { useWalletName } from "../common/useWalletName";

const useBalance = () => {
  const balance = useSelector(state => state.balance);
  const dispatch = useDispatch();
  const walletName = useWalletName();

  useEffect(() => {
    const poll = new Poll(async () => {
      await dispatch(Thunks.getBalance(__NONCE__, walletName!));
    }, 5000);

    poll.start();

    return poll.stop;
  }, [dispatch, walletName]);

  return balance;
};

export const WalletTransactions = () => {
  // const transactionList = useTransactionList();
  const balance = useBalance();

  return (
    <div>
      <Typography>Balance: ₿{balance}</Typography>
    </div>
  );
};
