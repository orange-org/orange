import { commandLineArgs } from "_m/common/CommandLineArgs";
import { BackendService } from "../BackendService/BackendService";
import { RpcServerConfigurations } from "../RpcServerConfigurations";

export class Lnd extends BackendService {
  getArgs = () => {
    const args = [
      "--bitcoin.active",
      "--bitcoin.node=bitcoind",
      `--bitcoind.rpcuser=${RpcServerConfigurations.username}`,
      `--bitcoind.rpcpass=${RpcServerConfigurations.password}`,
      `--bitcoind.zmqpubrawblock=tcp://${RpcServerConfigurations.hostname}:28332`,
      `--bitcoind.zmqpubrawtx=tcp://${RpcServerConfigurations.hostname}:28333`,
    ];

    /* istanbul ignore if */
    if (commandLineArgs.testnet) {
      args.push("--bitcoin.testnet");
    }

    if (commandLineArgs["lnd.datadir"]) {
      args.push(`--datadir=${commandLineArgs["lnd.datadir"]}`);
    } else {
      args.push(`--datadir=${this.getDatadir()}`);
    }

    return args;
  };

  call = () => null;
}
