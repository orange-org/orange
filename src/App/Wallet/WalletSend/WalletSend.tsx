import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMnemonicTextarea } from "../common/useMnemonicTextarea";
import { wallet } from "src/data/WalletThunks";

export const WalletSend = () => {
  const walletStats = useSelector(state => state.walletStats);
  const [targetAddress, setTargetAddress] = useState("");
  const [feeRate, setFeeRate] = useState("");
  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState<any>(null);

  if (!walletStats) {
    return null;
  }

  const createTransaction = async () => {
    const payload = await wallet.createTransaction(
      walletStats.addressesWithUtxo,
      { address: targetAddress, value: parseInt(amount) },
      parseInt(feeRate),
      walletStats.nextUnusedChangeAddress.address,
      mnemonic,
    );

    setTransaction(payload.transaction.toHex());
  };

  const { mnemonicTextarea, mnemonic } = useMnemonicTextarea();

  return (
    <div>
      <h2>Send</h2>

      <p>
        <label htmlFor="targetAddress">Address</label>
        <input
          type="text"
          id="targetAddress"
          value={targetAddress}
          onChange={event => setTargetAddress(event.target.value)}
        />
      </p>

      <p>
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={event => setAmount(event.target.value)}
        />
      </p>

      <p>
        <label htmlFor="feeRate">Fee: sats/kb</label>
        <input
          type="text"
          id="feeRate"
          value={feeRate}
          onChange={event => setFeeRate(event.target.value)}
        />
      </p>

      <p>
        <label htmlFor="mnemonic">Secret seed phrase</label>
        {mnemonicTextarea}
      </p>

      <p>
        <button type="button" onClick={() => createTransaction()}>
          Preview
        </button>
      </p>

      {transaction ? <pre>{JSON.stringify(transaction, null, 2)}</pre> : null}
    </div>
  );
};
