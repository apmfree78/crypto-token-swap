import React, { ChangeEvent, useState, FormEvent } from 'react';
import styles from '../styles/Form.module.css';
import { ethers, Signer } from 'ethers';
import { USDC_Token, DAI_Token } from '../lib/cryptoData';
import { swapRouter } from './swapRouter';
import { useSigner, useProvider, useAccount } from 'wagmi';

const SwapToken = () => {
  const [amountIn, setAmountIn] = useState('');
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
    <section className={styles.form}>
      <form role='form' onSubmit={handleSubmit}>
        <div className={`field is-grouped ${styles.graybox}`}>
          <div className='control'>
            <input
              required
              className='input is-large'
              type='text'
              name='token0'
              onChange={handleChange}
              placeholder='0.0'
              value={amountIn}
              autoFocus
            />
          </div>
          <label htmlFor='token0' className='subtitle is-2'>
            USDC
          </label>
        </div>
        <div className={`field ${styles.center}`}>
          <i
            className={`fa-solid fa-arrow-down fa-2xl ${styles.graybox}`}
            style={{ padding: '2vh 1vw' }}
          ></i>
        </div>
        <div className={`field is-grouped ${styles.graybox}`}>
          <div className='control'>
            <input
              className='input is-large'
              type='text'
              name='token1'
              onChange={handleChange}
              placeholder='0.0'
              value={amountIn}
            />
          </div>
          <label htmlFor='token1' className='subtitle is-2'>
            DAI
          </label>
        </div>

        <div className={`field ${styles.graybox} ${styles.center}`}>
          <div className='select is-large is-rounded'>
            <select
              required
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <option>Choose Fee Level</option>
              <option>0.05% Fee</option>
              <option>0.1% Fee</option>
              <option>0.3% Fee</option>
              <option>1% Fee</option>
            </select>
          </div>
        </div>
        <div className={styles.center}>
          <button type='submit' className='button is-info is-large is-rounded'>
            Swap Tokens
          </button>
        </div>
      </form>
    </section>
  );
};

export default SwapToken;
