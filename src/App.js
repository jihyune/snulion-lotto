import "./App.css";
import { useConnect, useAccount, useBalance } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { disconnect } from "@wagmi/core";
import { useFaucet } from "./hooks/faucet";
import { useEnter } from "./hooks/enter";
import { useApprove } from "./hooks/approve";
import { LOTTO_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "./constant";
import { useAllowance } from "./hooks/allowance";

function App() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { address, isConnected } = useAccount();
  const handleConnect = () => {
    isConnected ? disconnect() : connect();
  };
  const { write: faucet } = useFaucet();

  const allowance = useAllowance();
  const { write: approve } = useApprove();
  const { write: enter } = useEnter();
  const handleEnter = () => {
    // eslint-disable-next-line no-undef
    if (Number(BigInt(allowance ?? "0")) === 0) {
      approve();
      return;
    }
    enter();
  };

  const { data } = useBalance({
    address: LOTTO_CONTRACT_ADDRESS,
    token: TOKEN_CONTRACT_ADDRESS,
  });
  const reward = data?.formatted;

  return (
    <div className="App">
      <div>
        <button className="button" onClick={() => faucet()}>
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
      </div>

      <button onClick={handleEnter}>Enter</button>
    </div>
  );
}

export default App;
