import React, {
  useEffect,
  useRef,
  ChangeEvent,
  useState,
  FormEvent,
} from 'react';
import { swapExchangeRate } from './quoteSwapAmount';
import InputToken from './InputToken';
import styles from '../styles/Form.module.css';
import { ethers, Signer } from 'ethers';
import {
  USDC_Token,
  DAI_Token,
  USDC_Token_test,
  WETH_Token_test,
  TokenList,
  percent1,
  percentPoint01,
  percentPoint3,
  percentPoint05,
} from '../lib/cryptoData';
import { swapRouter } from './swapRouter';
import { useSigner, useProvider, useAccount } from 'wagmi';

interface TokenSwapProp {
  TokenIn: { symbol: string; address: string };
  TokenOut: { symbol: string; address: string };
}

const SwapToken = () => {
  const [amountIn, setAmountIn] = useState<string>(''); // # of tokens to swap
  const [fee, setFee] = useState<number>(percentPoint05); // fee pool
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trade, setTrade] = useState<TokenSwapProp>({
    TokenIn: { ...DAI_Token },
    TokenOut: { ...USDC_Token },
  });
  const [exchangeRate, setExchangeRate] = useState(1);
  // wagmi hooks to pass to SwapRouter
  const provider = useProvider();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  // determine coin exchange rate
  useEffect(() => {
    (async () => {
      const updatedExchangeRate = await swapExchangeRate(
        trade.TokenIn.address,
        trade.TokenOut.address
      );
      // update state
      setExchangeRate(updatedExchangeRate);
    })();
  }, [trade.TokenIn.symbol, trade.TokenOut.symbol]);

  // swap in and out tokens when user clicks down arrow
  const handleSwap = () => {
    const tokenIn = { ...trade.TokenIn };
    const tokenOut = { ...trade.TokenOut };

    // swapping tokens
    setTrade({
      TokenIn: { ...tokenOut },
      TokenOut: { ...tokenIn },
    });
  };

  // form event handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAmountIn(e.target.value);

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) =>
    setFee(parseInt(e.target.value));

  const handleTokenSelection = (
    type: 'input' | 'output',
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedToken = e.target.value;

    // check input type
    if (type === 'input') {
      setTrade({
        ...trade,
        TokenIn: {
          symbol: newSelectedToken,
          address: TokenList[newSelectedToken].address,
        },
      });
    } else {
      setTrade({
        ...trade,
        TokenOut: {
          symbol: newSelectedToken,
          address: TokenList[newSelectedToken].address,
        },
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // set error and loading state
    setLoading(true);
    setError('');

    console.log(amountIn);
    // validing input is a number
    if (isNaN(parseFloat(amountIn))) return; // add error message

    // estimate amount of tokens returned in swap, and debounce input
    const finalAmountIn = ethers.utils.parseUnits(amountIn, 6).toString();
    console.log(finalAmountIn);

    // call contract to find pool an execute token swap
    const transaction = await swapRouter(
      trade.TokenIn.address,
      trade.TokenOut.address,
      finalAmountIn,
      fee,
      provider,
      address || '',
      signer as Signer
    ).catch((err) => {
      setError(err.message.substring(0, 25));
      setLoading(false);
    });

    // transaction complete
    setLoading(false);
    console.table(transaction);
    // output message based on transaction status
    if (!transaction) setError('Transaction Failed');
    else {
      // success message
      setSuccess(true);
    }
  };

  return (
    <section className={styles.form}>
      <form role='form' onSubmit={handleSubmit}>
        {/* user chooses the input token and amount to swap  */}
        <InputToken
          handleChange={handleChange}
          handleTokenSelection={handleTokenSelection}
          amountIn={amountIn}
        />
        {/* down arrow - when clicked swaps input and output token  */}
        <div className={`field ${styles.center}`}>
          <i
            onClick={handleSwap}
            className={`fa-solid fa-arrow-down fa-2xl ${styles.graybox}`}
            style={{ padding: '2vh 1vw' }}
          ></i>
        </div>
        {/* output token displayed with estimated amount of token recieved */}
        <div className={`field ${styles.graybox} ${styles.output}`}>
          <span
            className='subtitle is-4'
            style={{ paddingTop: '1.5vh', paddingLeft: '2vw', color: 'gray' }}
          >
            {amountIn
              ? (parseFloat(amountIn) * exchangeRate).toFixed(4)
              : '0.0'}
          </span>
          <span className='subtitle is-2'>{trade.TokenOut.symbol}</span>
        </div>
        <div className={`field ${styles.graybox} ${styles.center}`}>
          <div className='select is-large is-rounded'>
            <select
              onChange={handleSelection}
              required
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <option>Choose Fee Level</option>
              <option value={percentPoint01}>0.01% Fee</option>
              <option value={percentPoint05}>0.05% Fee</option>
              <option value={percentPoint3}>0.3% Fee</option>
              <option value={percent1}>1% Fee</option>
            </select>
          </div>
        </div>
        <div className={styles.center}>
          <button
            disabled={loading}
            type='submit'
            className={`button is-info is-large is-rounded ${loading && 'is-loading'
              }`}
          >
            Swap Tokens
          </button>
        </div>
      </form>
      {error && (
        <div
          className={`${styles.graybox} ${styles.center}`}
          style={{ color: 'red', marginTop: '1vh' }}
        >
          {error}
        </div>
      )}
      {success && (
        <div className={`${styles.graybox} `} style={{ marginTop: '1vh' }}>
          <h5 className='title is-5'>Transaction Successfully Submitted</h5>
          <a href='https://goerli.etherscan.io/tx/${transaction.hash}'>
            <u>View transaction on Explorer</u>
          </a>
        </div>
      )}
    </section>
  );
};

export default SwapToken;
