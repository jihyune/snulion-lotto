import { LOTTO_CONTRACT_ADDRESS } from "../constant";
import { LOTTO_ABI } from "../abi/lotto";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

export const useEnter = () => {
  const { config } = usePrepareContractWrite({
    address: LOTTO_CONTRACT_ADDRESS,
    abi: LOTTO_ABI,
    functionName: "enter",
  });
  const { write } = useContractWrite(config);

  return { write };
};
