import "./App.css";
import { useConnect, useAccount, useBalance, useContractRead } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { disconnect } from "@wagmi/core";
import { useFaucet } from "./hooks/faucet";
import { useEnter } from "./hooks/enter";
import { useApprove } from "./hooks/approve";
import { LOTTO_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "./constant";
import { useAllowance } from "./hooks/allowance";
import { LOTTO_ABI } from "./abi/lotto";

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
    staleTime: 10 * 60 * 1000,
  });
  const reward = data?.formatted;

  const { data: players } = useContractRead({
    address: LOTTO_CONTRACT_ADDRESS,
    abi: LOTTO_ABI,
    functionName: "getPlayers",
    staleTime: 10 * 60 * 1000,
  });

  return (
    <div className="App">
      <div className="wallet">
        <button className="button" onClick={handleConnect}>
          {isConnected
            ? address.slice(0, 4) + "..." + address.slice(-4)
            : "Connect Wallet"}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 py-10">
        <button className="small-button" onClick={() => faucet()}>
          Faucet
        </button>

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

      <button className="button" onClick={handleEnter}>
        Enter
      </button>

      <div className="py-20">players</div>
      {players.map((player, idx) => (
        <div key={idx}>{player}</div>
      ))}
    </div>
  );
}

export default App;
