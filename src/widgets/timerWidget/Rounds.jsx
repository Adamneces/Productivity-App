import React, { useContext, useState } from "react";
import styles from "./TimerWidget.module.css";
import { iconLeft, iconRight } from "./utilities/utilities";
import Button from "./UI/Button";

import TimerContext from "./store/TimerContext";

const Rounds = () => {
  const { setTimerStats, timerStats } = useContext(TimerContext);
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  function handleUserRounds(value) {
    if (timerStats.userRounds >= 1 && timerStats.userRounds <= 19) {
      if (value === 1) {
        setTimerStats((prev) => {
          return {
            ...prev,
            userRounds: prev.userRounds + 1,
          };
        });
      } else if (value === -1) {
        setTimerStats((prev) => {
          return {
            ...prev,
            userRounds: prev.userRounds - 1,
          };
        });
      } else {
        return;
      }
    }
  }

  return (
    <div className={styles.rounds_container}>
      <h4 className={styles.rounds_heading}>Rounds</h4>
      {isEditing ? (
        <div className={styles.rounds_inputIconsContainer}>
          <button onClick={() => handleUserRounds(-1)}>{iconLeft}</button>
          <span>{timerStats.userRounds}</span>
          <button onClick={() => handleUserRounds(1)}>{iconRight}</button>
        </div>
      ) : (
        <p className={styles.rounds_roundsDisplay}>
          {timerStats.rounds <= timerStats.userRounds
            ? timerStats.rounds
            : timerStats.rounds - 1}
          /{timerStats.userRounds}
        </p>
      )}
      <div>
        <Button
          onClick={toggleEditing}
          disabled={timerStats.isTimerActive || timerStats.isBreakActive}
          color="blue"
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          onClick={() =>
            setTimerStats((prev) => {
              return {
                ...prev,
                rounds: 1,
              };
            })
          }
          disabled={timerStats.isTimerActive || timerStats.isBreakActive}
          color="yellow"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Rounds;
