import React, { createContext, useState } from 'react';
// importing sample data
import { USDC_Token, DAI_Token } from '../lib/cryptoData';
interface Props {
  children?: React.ReactNode;
}

interface TokenSwapProp {
  TokenIn: { symbol: string; address: string };
  TokenOut: { symbol: string; address: string };
}
/*
  setDragPosition tracks the current position of a card that is
  being tragged and saved it into a ref called dragCoordinates
*/

export const GlobalContext: React.Context<any> = createContext('');

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [trade, setTrade] = useState<TokenSwapProp>({
    TokenIn: { ...DAI_Token },
    TokenOut: { ...USDC_Token },
  });

  return (
    <GlobalContext.Provider value={{ trade, setTrade }}>
      {children}
    </GlobalContext.Provider>
  );
};
