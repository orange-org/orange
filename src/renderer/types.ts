import { DeepReadonly } from "utility-types";

export type State = DeepReadonly<{
  systemPreferences: { [name: string]: string };
  bitcoindOutput: { initMessage: string };
}>;
