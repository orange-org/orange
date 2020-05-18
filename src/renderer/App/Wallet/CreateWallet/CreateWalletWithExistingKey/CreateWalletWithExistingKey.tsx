// import React from "react";
// import { useAtomicCss } from "_r/useAtomicCss";
// import { Typography, Paper, Button } from "@material-ui/core";
// import {
//   SeedPhraseField,
//   useSeedPhraseField,
// } from "./SeedPhraseField/SeedPhraseField";

// // import * as bip32 from "bip32";
// // import * as bip39 from "bip39";
// // import * as bitcoinJsLib from "bitcoinjs-lib";

// // const seed = bip39.mnemonicToSeedSync(
// //   "easily document potato soft put apple prosper twenty notable today symptom shrug",
// // );
// // const node = bip32.fromSeed(seed, bitcoinJsLib.networks.testnet);
// // console.log(node.toWIF());
// // node.toBase58;

// export const CreateWalletWithExistingKey = () => {
//   const a = useAtomicCss();
//   const seedPhraseFieldProps = useSeedPhraseField();
//   const { errors } = seedPhraseFieldProps;

//   return (
//     <div
//       className={a(
//         "maxWidth800",
//         "marginLeftAuto",
//         "marginRightAuto",
//         "marginTop16",
//       )}
//     >
//       <Typography className={a("marginTop05")} variant="h1">
//         Enter your key
//       </Typography>

//       <Paper className={a("marginTop05", "padding3")}>
//         <SeedPhraseField {...seedPhraseFieldProps} />
//       </Paper>

//       <Button color="primary" variant="contained" disabled={errors !== null}>
//         Create
//       </Button>
//     </div>
//   );
// };
