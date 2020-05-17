import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Typography, Paper, Divider } from "@material-ui/core";

const Paragraph: React.FC = ({ children }) => {
  const a = useAtomicCss();

  return <Typography className={a("marginTop05")}>{children}</Typography>;
};

export const CreateWalletWithNewKey = () => {
  const a = useAtomicCss();

  return (
    <div className={a("maxWidth800", "marginLeftAuto", "marginRightAuto")}>
      <Typography variant="h1" className={a("marginTop05")}>
        Create a wallet with a new key
      </Typography>

      <Paper className={a("marginTop05", "padding6")}>
        <Typography variant="h2">
          First, please make sure you&apos;re disconnected from the internet
        </Typography>

        <Paragraph>
          Disconnecting from the internet helps prove that your secret key is
          created by this computer only. It is not known to anybody outside of
          this computer.
        </Paragraph>

        <Paragraph>
          You alone are responsible for storing your key some where offline,
          secret and safe.
        </Paragraph>

        <Paragraph>If you lose your key, you lose your funds.</Paragraph>
        {/* <InternetConnectionStatus /> */}
      </Paper>

      <Divider className={a("marginTop05")} />
    </div>
  );
};
