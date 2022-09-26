import { ethers, Signer } from 'ethers';
// import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { abi as SwapRouterABI } from '@uniswap/swap-router-contracts/artifacts/contracts/interfaces/ISwapRouter02.sol/ISwapRouter02.json';
// import { abi as UniswapV3FactoryABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import { swapRouterAddress } from '../lib/contractAddress';
import { getPoolImmutables } from '../lib/poolMethods';
import { useSigner, useProvider, useAccount } from 'wagmi';

const swapRouter = async (
  token1Address: string,
  token2Address: string,
  amount: number, // in ethers format
  fee: number
) => {
  // wagmi hooks for to access wallet address , signer, and provider
  const provider = useProvider();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  // get pool immutables - we'll need these to execute the swap

  const immutables = await getPoolImmutables(token1Address, token2Address, fee);

  const swapRouterContract = new ethers.Contract(
    swapRouterAddress,
    SwapRouterABI,
    provider
  );

  // console.log(swapRouterContract);

  const params = {
    tokenIn: immutables.token0,
    tokenOut: immutables.token1,
    fee: immutables.fee,
    recipient: address,
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

export default swapRouter;
