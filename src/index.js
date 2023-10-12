import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WagmiConfig, configureChains, mainnet, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { sepolia } from "wagmi/chains";

const root = ReactDOM.createRoot(document.getElementById("root"));

const { provider, webSocketProvider } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
);
const client = createClient({
  autoConnect: true,
  provider,
  // connectors: [new MetaMaskConnector({ chains })],
  webSocketProvider,
});

root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
