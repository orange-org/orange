import React from "react";
// import { useSelector } from "react-redux";
// import { Selectors } from "src/data/Selectors";

export const WalletSend = () => {
  // const walletAddressesAnalysis = useSelector(Selectors.getAddressesAnalysis);

  return (
    <div>
      <h2>Send</h2>

      <p>
        <label htmlFor="sendAddress">Address</label>
        <input type="text" id="sendAddress" />
      </p>

      <p>
        <label htmlFor="sendFee">Fee</label>
        <input type="text" id="sendFee" />
      </p>

      <p>
        <button type="button">Preview</button>
      </p>
    </div>
  );
};
