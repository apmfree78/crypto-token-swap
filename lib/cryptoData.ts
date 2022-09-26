// interface ABI for Quoter contract function we need
export const QuoterABI = [
  // 'function uniswapV3SwapCallback( int256 amount0Delta, int256 amount1Delta, bytes memory path) external view',
  'function quoteExactInputSingle( address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) public returns (uint256 amountOut)',
];

// this data structure will hold all token address and corresponding pool address we need
interface TokenDataType {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
}

export const USDC_Token: TokenDataType = {
  name: 'USDC Token',
  symbol: 'USDC',
  decimals: 18,
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
};

export const DAI_Token: TokenDataType = {
  name: 'DAI Token',
  symbol: 'DAI',
  decimals: 18,
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
};
