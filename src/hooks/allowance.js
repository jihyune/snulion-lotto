import { LOTTO_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constant";

import { useContractRead, useAccount } from "wagmi";
import { TOKEN_ABI } from "../abi/token";

export const useAllowance = () => {
  const { address: walletAddress } = useAccount();

  const { data } = useContractRead({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [walletAddress, LOTTO_CONTRACT_ADDRESS],
    staleTime: 10 * 60 * 1000,
  });

  return data;
};
