import { abi as UniswapV3FactoryABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { UniswapV3Factory } from './contractAddress';
import { useProvider } from 'wagmi';
import { ethers } from 'ethers';
import { immutableType } from '../lib/cryptoData';

export const getPoolImmutables = async (
  address1: string,
  address0: string,
  feeLevel: number
) => {
  const provider = useProvider();

  // access contract
  const UniswapV3FactoryContract = new ethers.Contract(
    UniswapV3Factory,
    UniswapV3FactoryABI,
    provider
  );

  // find pool address
  const poolAddress = await UniswapV3FactoryContract.getPool(
    address1,
    address0,
    feeLevel
  );
  console.log(poolAddress);
  //create pool contract using poolAddress

  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );

  // finally extract immutables
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  const immutables = {
    token0: token0,
    token1: token1,
    fee: fee,
  };
  return immutables;
};

// exports.getPoolState = async (poolContract) => {
//   const slot = poolContract.slot0();

//   const state = {
//     sqrtPriceX96: slot[0],
//   };

//   return state;
// };
