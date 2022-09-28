export const percent1 = 10000;
export const percentPoint01 = 100;
export const percentPoint3 = 3000;
export const percentPoint05 = 500;

export interface immutableType {
  token0: string;
  token1: string;
  fee: string;
}
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
  decimals: 6,
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
};

export const DAI_Token: TokenDataType = {
  name: 'DAI Token',
  symbol: 'DAI',
  decimals: 18,
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
};

export const USDC_Token_test: TokenDataType = {
  name: 'USDC Token',
  symbol: 'USDC',
  decimals: 6,
  address: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
};

export const DAI_Token_test: TokenDataType = {
  name: 'DAI Token',
  symbol: 'DAI',
  decimals: 18,
  address: '0xdc31ee1784292379fbb2964b3b9c4124d8f89c60',
};

export const WETH_Token_test: TokenDataType = {
  name: 'WETH Token',
  symbol: 'WETH',
  decimals: 18,
  address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
};
