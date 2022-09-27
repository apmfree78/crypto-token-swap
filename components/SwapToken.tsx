import React, { ChangeEvent, useState, FormEvent } from 'react';
import { ethers, Signer } from 'ethers';
import { USDC_Token, DAI_Token } from '../lib/cryptoData';
import { swapRouter } from './swapRouter';
import { useSigner, useProvider, useAccount } from 'wagmi';

const SwapToken = () => {
  const [amountIn, setAmountIn] = useState('10');
  const provider = useProvider();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAmountIn(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // estimate amount of tokens returned in swap, and debounce input
    const finalAmountIn = ethers.utils.parseUnits(amountIn, 6).toString();
    console.log(finalAmountIn);

    // call contract to find pool an execute token swap
    swapRouter(
      DAI_Token.address,
      USDC_Token.address,
      finalAmountIn,
      3000,
      provider,
      address || '',
      signer as Signer
    );
  };

  return (
    <section>
      <form role='form' onSubmit={handleSubmit}>
        <label htmlFor='token0'>USDC</label>
        <input
          name='token0'
          onChange={handleChange}
          placeholder='0.0'
        // value={amountIn}
        />
        <button type='submit'>Swap</button>
      </form>
    </section>
  );
};

export default SwapToken;
