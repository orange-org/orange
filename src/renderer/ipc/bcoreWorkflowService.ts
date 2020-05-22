import { PromiseType } from "_t/typeHelpers";
import {
  ShowErrorMtM,
  RpcRequestMtM,
  RpcConfigurations,
  CreateWalletAndSetSeedPayload,
} from "_t/IpcMessages";
import { callMain } from "./callMain";

class BcoreWorkflowService {
  createWalletAndSetSeed = (
    nonce: NONCE,
    payload: CreateWalletAndSetSeedPayload,
  ) =>
    callMain({
      nonce,
      type: "createWalletAndSetSeed",
      payload,
    });
}

export const bcoreWorkflowService = new BcoreWorkflowService();
