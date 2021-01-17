import {
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern/node8";
import RelaySSR, {
  SSRCache,
} from "react-relay-network-modern-ssr/node8/server";
import { Network, Environment, RecordSource, Store } from "relay-runtime";

export function initEnvironment() {
  const source = new RecordSource();
  const store = new Store(source);
  const relaySSR = new RelaySSR();

  return {
    relaySSR,
    environment: new Environment({
      store,
      network: new RelayNetworkLayer([
        urlMiddleware({
          url: (req) => process.env.NEXT_PUBLIC_RELAY_ENDPOINT,
        }),
        relaySSR.getMiddleware(),
      ]),
    }),
  };
}

export function createEnvironment(relayData: SSRCache): Environment {
  const source = new RecordSource();
  const store = new Store(source);

  return new Environment({
    store,
    network: Network.create(
      () => (relayData?.[0][1] as any) || Promise.resolve()
    ),
  });
}
