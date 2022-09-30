import React, { useRef, ChangeEvent, useState } from 'react';
import { ethers } from 'ethers';
import {
  QuoterABI,
  DAI_Token,
  USDC_Token_test,
  DAI_Token_test,
} from '../lib/cryptoData';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const QuotePrice = () => {
  const [amountIn, setAmountIn] = useState('10');
  let timeout: any; // debounce variable
  let finalamountIn = useRef('0');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setAmountIn(e.target.value);
    }, 500);
  };

  // estimate amount of tokens returned in swap, and debounce input
  finalamountIn.current = ethers.utils
    .parseUnits(amountIn, DAI_Token.decimals)
    .toString();
  console.log(finalamountIn);

  const { config } = usePrepareContractWrite({
    addressOrName: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    contractInterface: QuoterABI,
    functionName: 'quoteExactInputSingle',
    args: [
      DAI_Token_test.address,
      USDC_Token_test.address,
      3000,
      finalamountIn.current,
      0,
    ],
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // execute contract
  // write?.();
  console.log(data);

  return (
    <>
      <label htmlFor='token0'>USDC</label>
      <input
        name='token0'
        onChange={handleChange}
        placeholder='0.0'
      // value={amountIn}
      />
      <button onClick={() => write?.()}>Get Quote</button>
    </>
  );
};

export default QuotePrice;
