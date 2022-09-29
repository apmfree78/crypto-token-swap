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

interface TokenArrayType {
  [key: string]: TokenDataType;
}

export const QuoterABI = [
  'function quoteExactInputSingle( address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) public returns (uint256 amountOut)',
];

export const TokenList: TokenArrayType = {
  USDC: {
    name: 'USDC Token',
    symbol: 'USDC',
    decimals: 6,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  },
  DAI: {
    name: 'DAI Token',
    symbol: 'DAI',
    decimals: 18,
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
  WBTC: {
    name: 'WBTC Token',
    symbol: 'WBTC',
    decimals: 8,
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  },
  MANA: {
    name: 'MANA Token',
    symbol: 'MANA',
    decimals: 18,
    address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
  },
  CRO: {
    name: 'CRO Token',
    symbol: 'CRO',
    decimals: 8,
    address: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
  },
  SAND: {
    name: 'SAND Token',
    symbol: 'SAND',
    decimals: 18,
    address: '0x3845badade8e6dff049820680d1f14bd3903a5d0',
  },
  AAVE: {
    name: 'AAVE Token',
    symbol: 'AAVE',
    decimals: 18,
    address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
  },

  NEXO: {
    name: 'NEXO Token',
    symbol: 'NEXO',
    decimals: 18,
    address: '0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206',
  },
  LINK: {
    name: 'LINK Token',
    symbol: 'LINK',
    decimals: 18,
    address: '0x514910771af9ca656af840dff83e8264ecf986ca',
  },
  APE: {
    name: 'APE Token',
    symbol: 'APE',
    decimals: 18,
    address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
  },
  UNI: {
    name: 'UNI Token',
    symbol: 'UNI',
    decimals: 18,
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  },
  PAX: {
    name: 'PAX Token',
    symbol: 'PAX',
    decimals: 18,
    address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
  },
  SHIB: {
    name: 'SHIB Token',
    symbol: 'SHIB',
    decimals: 18,
    address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
  },
  FTX: {
    name: 'FTX Token',
    symbol: 'FTX',
    decimals: 18,
    address: '0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9',
  },
  BUSD: {
    name: 'BUSD Token',
    symbol: 'BUSD',
    decimals: 18,
    address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
  },
  USDT: {
    name: 'USDT Token',
    symbol: 'USDT',
    decimals: 6,
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  },
};

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
