// interface ABI for Quoter contract function we need
export const QuoterABI = [
  // 'function uniswapV3SwapCallback( int256 amount0Delta, int256 amount1Delta, bytes memory path) external view',
  'function quoteExactInputSingle( address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) public returns (uint256 amountOut)',
];

// this data structure will hold all token address and corresponding pool address we need
interface TokenDataType {
  [token: string]: {
    address: string;
    dot3: { [token: string]: { contract: string } };
    dot1: { [token: string]: { contract: string } };
    one: { [token: string]: { contract: string } };
  };
}

export const TokenData: TokenDataType = {
  USDC: {
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    dot3: { DAI: { contract: '0' } },
    dot1: { DAI: { contract: '0' } },
    one: { DAI: { contract: '0' } },
  },
  DAI: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    dot3: { USDC: { contract: '0x6c6bc977e13df9b0de53b251522280bb72383700' } }, // 0.05%
    dot1: { USDC: { contract: '0x5777d92f208679db4b9778590fa3cab3ac9e2168' } },
    one: { USDC: { contract: '0' } },
  },
};
