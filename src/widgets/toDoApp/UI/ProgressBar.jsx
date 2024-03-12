import React from 'react'
import styles from "../ToDoApp.module.css"

const ProgressBar = ({progress, height}) => {
  return (
    <div style={{height: height}} className={styles.daily_tracker_progressContainer}>
        <div
          className={`${styles.daily_tracker_progressBar} ${
            progress > 99.9 ? styles.daily_tracker_everythingCompleted : ""
          }`}
          style={{
            width: `${progress ? progress : "0"}%`,
            background:
              progress < 25 ? "red" : progress < 50 ? "orange" : progress < 75 ? "yellow" : "green",
          }}
        ></div>
      </div>
  )
}

export default ProgressBar
