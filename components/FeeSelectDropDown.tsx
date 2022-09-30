import styles from '../styles/Form.module.css';
import {
  percent1,
  percentPoint01,
  percentPoint3,
  percentPoint05,
} from '../lib/cryptoData';
import { ChangeEvent } from 'react';

interface FeeSelectDropDownProps {
  handleSelection: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FeeSelectDropDown: React.FC<FeeSelectDropDownProps> = ({
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
          <option>Choose Fee Level</option>
          <option value={percentPoint01}>0.01% Fee</option>
          <option value={percentPoint05}>0.05% Fee</option>
          <option value={percentPoint3}>0.3% Fee</option>
          <option value={percent1}>1% Fee</option>
        </select>
      </div>
    </div>
  );
};

export default FeeSelectDropDown;
