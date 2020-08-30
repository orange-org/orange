/* eslint-disable import/no-default-export */
declare module "coinselect/accumulative" {
  import { Utxos } from "src/data/BlockchainService";

  export type Target = {
    address: string;
    value: number;
  };

  type Targets = Target[];

  type Input = {
    txid: string;
    vout: number;
    address: string;
    value: number;
    derivationPath: string;
  };

  type Inputs = Input[];

  type Output = {
    address: string | undefined;
    value: number;
  };

  type Outputs = Output[];

  type ReturnValue = {
    inputs: Inputs;
    outputs: Outputs;
    fee: number;
  };

  export default function(
    utxos: Utxos,
    targets: Targets,
    feeRate: number,
  ): ReturnValue;
}
