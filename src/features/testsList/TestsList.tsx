import React from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';

import styles from './TestsList.module.css';

export function TestsList() {
  
  const testData = useSelector(state=>state);
  const [pollingInterval, setPollingInterval] = React.useState(5000);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.row} />
      <div className={styles.row}>
        {/*
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(getTestsList(incrementValue))}
        >
          Fetch all data
        </button>
    
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button> */}

        {
          /* <button
            className={styles.button}
            onClick={() => dispatch(incrementIfOdd(incrementValue))}
          >
            Add If Odd
          </button> */
        }
      </div>
    </div>
  );
}
