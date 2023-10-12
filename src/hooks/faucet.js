import { TOKEN_CONTRACT_ADDRESS } from "../constant";
import { TOKEN_ABI } from "../abi/token";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

export const useFaucet = () => {
  const { config } = usePrepareContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "faucet",
  });
  const { write } = useContractWrite(config);

  return { write };
};
