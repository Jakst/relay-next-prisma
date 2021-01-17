import { AppProps } from "next/app";
import { SSRCache } from "react-relay-network-modern-ssr/node8/server";
import { RelayEnvironmentProvider } from "relay-hooks";
import { createEnvironment } from "../lib/createEnvironment";

interface PageProps extends AppProps<any> {
  pageProps: {
    relayData: SSRCache;
  };
}

export default function App({ Component, pageProps }: PageProps) {
  return (
    <RelayEnvironmentProvider
      environment={createEnvironment(pageProps.relayData)}
    >
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}
