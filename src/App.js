import "./App.css";
import { LOTTO_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "./constant";

function App() {
  const reward = 10;

  return (
    <div className="App">
      <div className="wallet">
        <button className="button">Connect Wallet</button>
      </div>

      <div className="flex items-center justify-center gap-2 py-10">
        <button className="small-button">Faucet</button>

        <a
          className="underline block"
          href={`https://sepolia.etherscan.io/address/${TOKEN_CONTRACT_ADDRESS}`}
        >
          token scanner
        </a>
        <a
          className="underline"
          href={`https://sepolia.etherscan.io/address/${LOTTO_CONTRACT_ADDRESS}`}
        >
          lotto scanner
        </a>
      </div>

      <div>
        <div className="title">Jack Pot ! {reward} LION 🪙</div>
      </div>

      <button className="button">Enter</button>
    </div>
  );
}

export default App;
