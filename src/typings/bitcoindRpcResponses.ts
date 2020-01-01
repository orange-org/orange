/* eslint-disable camelcase */
// import { NetworkInfoRpcRequest } from "typings/bitcoindRpcRequests";

type LocalServicesNames = "WITNESS" | "NETWORK_LIMITED";

type Network = {
  name: string;
  limited: boolean;
  reachable: boolean;
  proxy: string;
  proxy_randomize_credentials: boolean;
};

export type NetworkInfo = {
  version: number;
  subversion: string;
  protocolversion: number;
  localservices: string;
  localservicesnames: LocalServicesNames[];
  localrelay: boolean;
  timeoffset: number;
  networkactive: boolean;
  connections: number;
  networks: [Network, Network, Network];
  relayfee: number;
  incrementalfee: number;
  localaddresses: [];
  warnings: string;
};

export type NetworkInfoRpcResponse = {
  payload: {
    result: NetworkInfo;
  };
};

export type BestBlockHash = {
  stuff: boolean;
};

export type BestBlockHashRpcResponse = {
  payload: {
    result: BestBlockHash;
  };
};

export type RpcResponse = {
  ok: boolean;
  requestId: string;
} & (NetworkInfoRpcResponse | BestBlockHashRpcResponse);

export type RawRpcResponse = { result: any };

type NarrowAction<T, N> = T extends { type: N } ? T : never;
