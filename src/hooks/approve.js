import { LOTTO_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constant";

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { TOKEN_ABI } from "../abi/token";

export const useApprove = () => {
  const { config } = usePrepareContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [
      LOTTO_CONTRACT_ADDRESS,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    ],
  });
  const { write } = useContractWrite(config);

  return { write };
};
