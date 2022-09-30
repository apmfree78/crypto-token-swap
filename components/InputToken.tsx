import { ChangeEvent } from 'react';
import styles from '../styles/Form.module.css';
import { TokenList } from '../lib/cryptoData';
import TokenSelectDropDown from './TokenSelectDropDown';

interface InputTokenProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTokenSelection: (
    type: 'input' | 'output',
    e: ChangeEvent<HTMLSelectElement>
  ) => void;
  amountIn: string;
}

const InputToken: React.FC<InputTokenProps> = ({
  handleChange,
  handleTokenSelection,
  amountIn,
}) => {
  return (
    <div className={`field is-grouped ${styles.graybox}`}>
      <div className='control'>
        <input
          required
          className='input is-large'
          type='text'
          name='token0'
          onChange={handleChange}
          placeholder='0.0'
          value={amountIn}
          autoFocus
        />
      </div>
      <TokenSelectDropDown
        handleSelection={(e) => handleTokenSelection('input', e)}
      />
      {/* <div className={`field ${styles.graybox} ${styles.center}`}> */}
      {/*   <div className='select is-large is-rounded'> */}
      {/*     <select */}
      {/*       onChange={(e) => handleTokenSelection('input', e)} */}
      {/*       required */}
      {/*       style={{ backgroundColor: 'transparent', border: 'none' }} */}
      {/*     > */}
      {/*       {Object.keys(TokenList).map((symbol) => { */}
      {/*         return <option>{symbol}</option>; */}
      {/*       })} */}
      {/*     </select> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
};

export default InputToken;
