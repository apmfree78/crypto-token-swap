import React, { useEffect, ChangeEvent, useState, FormEvent } from 'react';
import ethers from 'ethers';
import { QuoterABI, TokenData } from '../lib/cryptoData';
import { useContractRead } from 'wagmi';

const SwapToken = () => {
  const [amountIn, setAmountIn] = React.useState('0');
  const [estimateLoading, setEstimateLoading] = useState(false);
  let timeout: any; // debounce variable

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountIn(e.target.value);
  };

  // estimate amount of tokens returned in swap, and debounce input
  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const finalamountIn = ethers.utils.parseUnits(amountIn, 6).toString();

      const { data, isError, isLoading } = useContractRead({
        addressOrName: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
        contractInterface: QuoterABI,
        functionName: 'quoteExactInputSingle',
        args: [
          TokenData.USDC.address,
          TokenData.DAI.address,
          3000,
          finalamountIn,
          0,
        ],
      });

      // set loading state
      setEstimateLoading(isLoading);
    }, 1000);
  }, [amountIn]);

  // const { data, write } = useContractWrite(config);
  // const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <form>
      <label htmlFor='token0'>USDC</label>
      <input
        name='token0'
        onChange={handleChange}
        placeholder='0.0'
        value={amountIn}
      />
      <button type='submit' disabled={estimateLoading}>
        Submit
      </button>
    </form>
  );
};

export default SwapToken;
