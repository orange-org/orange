import { Typography, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Thunks } from "_r/redux/Thunks";
import { useAtomicCss } from "_r/useAtomicCss";
import { Poll } from "_r/utils/Poll";
import { Selectors } from "_r/redux/Selectors";
import { WalletTransaction, WalletTransactionList } from "_t/RpcResponses";
import { red, green } from "@material-ui/core/colors";
import { Constants } from "_c/constants";
import { Utils } from "_r/utils/Utils";
import { useWalletName } from "../common/useWalletName";

const pollInterval = 5000;

const useBalance = () => {
  const balance = useSelector(state => state.balance);
  const dispatch = useDispatch();
  const walletName = useWalletName();

  useEffect(() => {
    const poll = new Poll(async () => {
      await dispatch(Thunks.getBalance(__NONCE__, walletName!));
    }, pollInterval);

    poll.start();

    return poll.stop;
  }, [dispatch, walletName]);

  return balance;
};

const useTransactionList = () => {
  const walletName = useWalletName();
  const dispatch = useDispatch();

  useEffect(() => {
    const poll = new Poll(async () => {
      await dispatch(Thunks.listTransactions(__NONCE__, walletName!, 5000));
    }, pollInterval);

    poll.start();

    return poll.stop;
  }, [dispatch, walletName]);

  return {
    pendingTransactions: useSelector(Selectors.pendingTransactions),
    confirmedTransactions: useSelector(Selectors.confirmedTransactions),
  };
};

const Transaction: React.FC<{ value: WalletTransaction }> = props => {
  const a = useAtomicCss();
  const transaction = props.value;

  return (
    <div
      className={a(
        "displayFlex",
        "borderRightStyleSolid",
        "borderWidth4px",
        "padding2",
      )}
      style={{
        borderColor: transaction.category === "send" ? red[200] : green[200],
      }}
    >
      <Typography className={a("flex1")}>
        {Utils.secondsTimestampToFormattedDate(transaction.blocktime)}
      </Typography>
      <Typography>
        {Constants.b}
        {transaction.amount}
      </Typography>
    </div>
  );
};

const Transactions: React.FC<{
  list: WalletTransactionList | undefined;
}> = props => (
  <div>
    {props.list?.map(transaction => (
      <Transaction value={transaction} key={transaction.txid} />
    ))}
  </div>
);

const NoTransactions: React.FC<{ type: "pending" | "confirmed" }> = props => {
  const a = useAtomicCss();

  return (
    <div
      className={a(
        "padding2",
        "displayFlex",
        "justifyContentCenter",
        "alignItemsCenter",
      )}
    >
      <Typography>No {props.type} transactions</Typography>
    </div>
  );
};

const NoPendingTransactions = () => <NoTransactions type="pending" />;

const NoConfirmedTransactions = () => <NoTransactions type="confirmed" />;

export const WalletTransactions = () => {
  const { pendingTransactions, confirmedTransactions } = useTransactionList();
  const a = useAtomicCss();
  const balance = useBalance();

  return (
    <div className={a("maxWidth800", "marginLeftAuto", "marginRightAuto")}>
      <Typography variant="h2">Balance: ₿{balance}</Typography>

      <div className={a("marginTop05")}>
        <div>
          <Typography variant="h3">Pending</Typography>

          <Paper className={a("marginTop02")}>
            {pendingTransactions?.length ? (
              <Transactions list={pendingTransactions} />
            ) : (
              <NoPendingTransactions />
            )}
          </Paper>
        </div>

        <div className={a("marginTop05")}>
          <Typography variant="h3">Confirmed</Typography>

          <Paper className={a("marginTop02", "overflowHidden")}>
            {confirmedTransactions?.length ? (
              <Transactions list={confirmedTransactions} />
            ) : (
              <NoConfirmedTransactions />
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
};
