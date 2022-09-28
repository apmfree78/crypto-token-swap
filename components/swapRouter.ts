import { ethers, Signer } from 'ethers';
// import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { abi as SwapRouterABI } from '@uniswap/swap-router-contracts/artifacts/contracts/interfaces/ISwapRouter02.sol/ISwapRouter02.json';
// import { abi as UniswapV3FactoryABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import {
  swapRouterAddress,
  swapRouterAddress_test,
} from '../lib/contractAddress';
import { getPoolImmutables } from '../lib/poolMethods';

export const swapRouter = async (
  token1Address: string,
  token2Address: string,
  amount: string, // in ethers format
  fee: number,
  provider: any,
  walletAddress: string,
  signer: Signer
) => {
  // wagmi hooks for to access wallet address , signer, and provider
  // get pool immutables - we'll need these to execute the swap

  const immutables = await getPoolImmutables(
    token1Address,
    token2Address,
    fee,
    provider
  );

  const swapRouterContract = new ethers.Contract(
    swapRouterAddress_test,
    SwapRouterABI,
    provider
  );

  // console.log(swapRouterContract);

  const params = {
    tokenIn: immutables.token0,
    tokenOut: immutables.token1,
    fee: immutables.fee,
    recipient: walletAddress,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    amountIn: amount,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };

  const transaction = await swapRouterContract
    .connect(signer as Signer)
    .exactInputSingle(params, {
      gasLimit: ethers.utils.hexlify(1000000),
    });

  return transaction;
};
