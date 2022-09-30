import { ChangeEvent } from 'react';
import styles from '../styles/Form.module.css';
import TokenSelectDropdown from './TokenSelectDropDown';

interface OutputTokenProps {
  handleTokenSelection: (
    type: 'input' | 'output',
    e: ChangeEvent<HTMLSelectElement>
  ) => void;
  amountIn: string;
  exchangeRate: number;
}

const OutputToken: React.FC<OutputTokenProps> = ({
  handleTokenSelection,
  amountIn,
  exchangeRate,
}) => {
  return (
    <div className={`field ${styles.graybox} ${styles.output}`}>
      <span
        className='subtitle is-4'
        style={{ paddingTop: '1.5vh', paddingLeft: '2vw', color: 'gray' }}
      >
        {amountIn ? (parseFloat(amountIn) * exchangeRate).toFixed(4) : '0.0'}
      </span>
      <span className='subtitle is-2'>
        <TokenSelectDropdown handleSelection={(e) => handleTokenSelection('output', e)} />
      </span>
    </div>
  );
};

export default OutputToken;
