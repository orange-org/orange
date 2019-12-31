/* eslint-disable camelcase */
import { NetworkInfoRpcRequest } from "typings/bitcoindRpcRequests";

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
  method: NetworkInfoRpcRequest["method"];
  payload: {
    result: NetworkInfo;
  };
};

export type RpcResponse = NetworkInfoRpcResponse;

export type RawRpcResponse = { result: any };
