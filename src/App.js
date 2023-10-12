import "./App.css";
import {
  useConnect,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { disconnect } from "@wagmi/core";
import { TOKEN_CONTRACT_ADDRESS } from "./constant";
import { TOKEN_ABI } from "./abi/token";

function App() {
  const reward = 10;
  const participants = ["lsjfdlakfs", "asfjlasjdfl", "alsfjlsjd"];

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { address, isConnected } = useAccount();
  const handleConnect = () => {
    isConnected ? disconnect() : connect();
  };
  const { config } = usePrepareContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "faucet",
  });
  const { write } = useContractWrite(config);

  return (
    <div className="App">
      <div>
        <button className="button" onClick={() => write()}>
          Faucet
        </button>
        <button className="button" onClick={handleConnect}>
          {isConnected
            ? address.slice(0, 4) + "..." + address.slice(-4)
            : "Connect Wallet"}
        </button>
      </div>
      <div>
        <div className="title">Jack Pot ! {reward} LION 🪙</div>
        <div className="sub-title">
          Congraturations! You are the winner! claim {reward} LION!
        </div>
      </div>

      <button>Enter</button>

      <div>
        <div>Participants</div>
        {participants.map((participant) => {
          return <div>{participant}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
