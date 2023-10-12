import "./App.css";
import { useConnect, useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { disconnect } from "@wagmi/core";

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

  return (
    <div className="App">
      <div>
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
