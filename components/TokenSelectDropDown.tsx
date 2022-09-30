import { ChangeEvent } from 'react';
import styles from '../styles/Form.module.css';
import { TokenList } from '../lib/cryptoData';

interface TokenSelectDropdownProps {
  handleSelection: (e: ChangeEvent<HTMLSelectElement>) => void;
}
const TokenSelectDropdown: React.FC<TokenSelectDropdownProps> = ({
  handleSelection,
}) => {
  return (
    <div className={`field ${styles.graybox} ${styles.center}`}>
      <div className='select is-large is-rounded'>
        <select
          onChange={handleSelection}
          required
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          {Object.keys(TokenList).map((symbol) => {
            return (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default TokenSelectDropdown;
