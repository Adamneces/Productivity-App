import React, { useContext } from "react";
import styles from "./TimerWidget.module.css";

import Timer from "./timer/Timer";
import BreakTimer from "./breakTimer/BreakTimer";
import Rounds from "./Rounds";
import TimerFinished from "./TimerFinished";
import Sounds from "./Sounds";

import TimerContext from "./store/TimerContext.jsx";

export default function TimerWidget() {
  const {timerStats} = useContext(TimerContext);

  return (
      <div
        className={`${styles.container} ${
          timerStats.timerFinished ? styles.animation : ""
        }`}
      >
        {timerStats.timerFinished ? (
          <TimerFinished />
        ) : (
          <>
            <Timer />
            <BreakTimer />
            <Rounds />
            <Sounds />
          </>
        )}
      </div>
  );
}
