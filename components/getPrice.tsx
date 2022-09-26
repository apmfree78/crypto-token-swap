import React, { ChangeEvent, useState, FormEvent } from 'react';
import { ethers } from 'ethers';
import { QuoterABI, TokenData } from '../lib/cryptoData';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const SwapToken = () => {
  const [amountIn, setAmountIn] = useState('10');
  let timeout: any; // debounce variable

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setAmountIn(e.target.value);
    });
  };

  // estimate amount of tokens returned in swap, and debounce input
  const finalamountIn = ethers.utils.parseUnits(amountIn, 6).toString();
  console.log(finalamountIn);

  const { config } = usePrepareContractWrite({
    addressOrName: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    contractInterface: QuoterABI,
    functionName: 'quoteExactInputSingle',
    args: [
      TokenData.DAI.address,
      TokenData.USDC.address,
      3000,
      finalamountIn,
      1000000,
    ],
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  // execute contract
  write?.();
  console.log(data);

  return (
    <form>
      <label htmlFor='token0'>USDC</label>
      <input
        name='token0'
        onChange={handleChange}
        placeholder='0.0'
      // value={amountIn}
      />
      <button type='submit' disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};

export default SwapToken;
