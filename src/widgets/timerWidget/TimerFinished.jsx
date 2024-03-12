import React, { useContext } from 'react'
import styles from "./TimerWidget.module.css"
import TimerContext from './store/TimerContext';

const TimerFinished = () => {
const {setTimerStats} = useContext(TimerContext);

function handleGoBack() {
  setTimerStats((prev) => {
    return {
      ...prev,
      timerFinished: false,
      rounds: 1,
    }
  })
}

  return (
    <div className={styles.timer_finished_container}>
      <h3 className={styles.timer_finished_heading}>Timer finished!</h3>
      <button onClick={handleGoBack} className={styles.timer_finished_backButton}>Go Back</button>
    </div>
  )
}

export default TimerFinished
