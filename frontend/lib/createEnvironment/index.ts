import type { Environment } from "relay-runtime";
import type { SSRCache } from "react-relay-network-modern-ssr/node8/server";
import type RelaySSR from "react-relay-network-modern-ssr/node8/server";

interface Env {
  relaySSR: RelaySSR;
  environment: Environment;
}

let initEnvironment: () => Env;
let createEnvironment: (relayData: SSRCache) => Environment;

if (typeof window === "undefined") {
  const server = require("./server");
  initEnvironment = server.initEnvironment;
  createEnvironment = server.createEnvironment;
} else {
  const client = require("./client");
  createEnvironment = client.createEnvironment;
}

export { initEnvironment, createEnvironment };
