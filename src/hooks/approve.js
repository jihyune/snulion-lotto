import { LOTTO_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constant";

import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
} from "wagmi";
import { TOKEN_ABI } from "../abi/token";
import { useState } from "react";

export const useApprove = () => {
  const [allowance, setAllowance] = useState(false);
  const { address: walletAddress } = useAccount();

  useContractRead({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [walletAddress, LOTTO_CONTRACT_ADDRESS],
    enabled: !!walletAddress,
    onSuccess: (data) => {
      // eslint-disable-next-line no-undef
      const bigInt = BigInt(data?.toString() ?? "0");

      setAllowance(bigInt > 0);
    },
  });

  const { config } = usePrepareContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [
      LOTTO_CONTRACT_ADDRESS,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    ],
    enabled: !allowance,
  });
  const { write } = useContractWrite(config);

  return { write, allowance };
};
