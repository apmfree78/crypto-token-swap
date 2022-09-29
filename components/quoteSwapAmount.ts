// make api call to coingecko API to get current price data
// of each coin and then determines exchange rate based on that
import axios from 'axios';

const coinGeckoAPI = 'https://api.coingecko.com/api/v3/coins/ethereum/contract';

export const swapExchangeRate = async (
  inputCoinAddress: string,
  outputCoinAddress: string
) => {
  // get value in sats of input Coin
  const inputResponse = await axios(
    `${coinGeckoAPI}/${inputCoinAddress}`
  ).catch((err) => console.error(err));

  if (!inputResponse) return 0;
  const { data: inputCoinData } = inputResponse;

  const InputCoinSatPrice = inputCoinData.market_data.current_price.sats;
  console.log(InputCoinSatPrice);

  const outputResponse = await axios(
    `${coinGeckoAPI}/${outputCoinAddress}`
  ).catch((err) => console.error(err));

  if (!outputResponse) return 0;
  const { data: outputCoinData } = outputResponse;

  const outputCoinSatPrice = outputCoinData.market_data.current_price.sats;
  console.log(outputCoinSatPrice);

  return InputCoinSatPrice / outputCoinSatPrice;
};
