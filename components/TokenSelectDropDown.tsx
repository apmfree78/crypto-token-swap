import { ChangeEvent, useContext } from 'react';
import styles from '../styles/Form.module.css';
import { TokenList } from '../lib/cryptoData';
import { GlobalContext } from '../context/GlobalContext';

interface TokenSelectDropdownProps {
  type: 'input' | 'output';
  handleSelection: (e: ChangeEvent<HTMLSelectElement>) => void;
}
const TokenSelectDropdown: React.FC<TokenSelectDropdownProps> = ({
  handleSelection,
  type,
}) => {
  const { trade } = useContext(GlobalContext);
  // setting state for token selection
  const selectValue =
    type === 'input' ? trade.TokenIn.symbol : trade.TokenOut.symbol;
  // this below value should not show up, as input and output value cannot be the same
  const excludedValue =
    type === 'input' ? trade.TokenOut.symbol : trade.TokenIn.symbol;
  return (
    <div className={`field ${styles.graybox} ${styles.center}`}>
      <div className='select is-large is-rounded'>
        <select
          onChange={handleSelection}
          required
          style={{ backgroundColor: 'transparent', border: 'none' }}
          value={selectValue}
        >
          {Object.keys(TokenList).map((symbol) => {
            if (symbol !== excludedValue) {
              return (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              );
            } else {
              return null;
            }
          })}
        </select>
      </div>
    </div>
  );
};

export default TokenSelectDropdown;
