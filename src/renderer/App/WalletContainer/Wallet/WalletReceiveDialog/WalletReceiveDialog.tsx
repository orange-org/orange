import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { RpcService } from "_r/RpcService/RpcService";
import { useLoadingAwareTypography } from "_r/App/hooks/useLoadingAwareTypography";

const useIsMatch = () => {
  const match = useRouteMatch("/wallet/:walletName/receive");
  return !!match;
};

const useGoBack = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return goBack;
};

export const useNewAddress = () => {
  const [newAddress, setNewAddress] = useState("");
  const { walletName } = useParams();

  useEffect(() => {
    const request = async () => {
      const address = await RpcService.getNewAddress(
        __NONCE__,
        walletName!,
        "bech32",
      );

      setNewAddress(address);
    };

    request();
  }, [walletName]);

  return newAddress;
};

export const WalletReceive = () => {
  const a = useAtomicCss();
  const isMatch = useIsMatch();
  const goBack = useGoBack();
  const address = useNewAddress();
  const Typography = useLoadingAwareTypography(!address);

  return (
    <Dialog open={isMatch}>
      <DialogTitle>Receive to</DialogTitle>

      <DialogContent>
        <Typography className={a("monospacedTypographyBox")}>
          {address || "tb1q5xxxxxxxxxDummyAddressxxxxxxxxxhdwengx"}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={goBack} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
