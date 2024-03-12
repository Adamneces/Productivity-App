import React, { useContext, useEffect, useState } from "react";
import styles from "../TimerWidget.module.css";
import SelectDropdown from "./components/SelectDropDown";
import { sixtyArray, hoursArray } from "../utilities/utilities.js";
import Button from "../UI/Button.jsx";

import TimerContext from "../store/TimerContext.jsx";

const Timer = () => {
  const {
    timerStats,
    setTimerStats,
    initialValues,
    setInitialValues,
    handleTimerReset,
  } = useContext(TimerContext);

  const [work, setWork] = useState(initialValues.timer);
  const [isEditing, setIsEditing] = useState(false);

  const audio = timerStats.pickedSound
    ? new Audio(timerStats.pickedSound)
    : null;

  function toggleActive() {
    setTimerStats((prev) => {
      return {
        ...prev,
        isTimerActive: !prev.isTimerActive,
      };
    });
  }

  function toggleEditing() {
    setIsEditing((prevValue) => !prevValue);
    setTimerStats((prev) => {
      return {
        ...prev,
        isTimerActive: false,
      };
    });

    setInitialValues((prev) => {
      return {
        ...prev,
        timer: {
          hours: work.hours,
          minutes: work.minutes,
          seconds: work.seconds,
        },
      };
    });
  }

  useEffect(() => {
    let interval;

    if (timerStats.isTimerActive) {
      document.title = `Timer - ${work.hours > 0 ? work.hours + ":" : ""}${
        work.minutes < 10 ? "0" + work.minutes : work.minutes
      }:${work.seconds < 10 ? "0" + work.seconds : work.seconds}`;
    } else if (work !== initialValues.timer) {
      document.title = "Timer Paused";
    } else {
      document.title = "Productivity Manager";
    }

    if (
      timerStats.isTimerActive &&
      timerStats.rounds <= timerStats.userRounds
    ) {
      interval = setInterval(() => {
        setWork((prevValue) => {
          const newSeconds =
            prevValue.seconds === 0 ? 59 : prevValue.seconds - 1;
          const newMinutes =
            prevValue.seconds === 0 && prevValue.minutes > 0
              ? prevValue.minutes - 1
              : prevValue.minutes;
          const newHours =
            prevValue.seconds === 0 &&
            prevValue.minutes === 0 &&
            prevValue.hours > 0
              ? prevValue.hours - 1
              : prevValue.hours;

          if (newSeconds < 1 && newMinutes < 1 && newHours < 1) {
            if (timerStats.rounds === timerStats.userRounds) {
              setWork(initialValues.timer);
            }
            toggleActive();
            handleTimerReset(setWork);
            clearInterval(interval); // Clear the interval immediately
            setTimerStats((prev) => {
              return {
                ...prev,
                isBreakActive: true,
              }
            })
            if (audio) {
              audio.play();
            }
          }
          return {
            seconds: newSeconds,
            minutes: newMinutes,
            hours: newHours,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerStats, work]);

  return (
    <div className={styles.timer_container}>
      <h4 className={styles.timer_heading}>Work</h4>
      {isEditing ? (
        <div className={styles.timer_labelSelectContainer}>
          {Object.keys(work).map((key) => (
            <SelectDropdown
              key={key}
              label={key}
              value={work[key]}
              onChange={setWork}
              options={key === "hours" ? hoursArray : sixtyArray}
            />
          ))}
        </div>
      ) : (
        <p className={styles.timer_time}>
          <span>{work.hours > 0 ? `${work.hours}:` : null}</span>
          <span>{work.minutes < 10 ? `0${work.minutes}` : work.minutes}</span>:
          <span>
            {work.seconds === 60
              ? "00"
              : work.seconds < 10
              ? `0${work.seconds}`
              : work.seconds}
          </span>
        </p>
      )}
      <div>
        <Button onClick={toggleEditing} disabled={timerStats.isTimerActive || timerStats.isBreakActive} color="blue">
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          disabled={isEditing || timerStats.isBreakActive}
          onClick={() => handleTimerReset(setWork)}
          color={"yellow"}
        >
          Reset
        </Button>
        <Button
          disabled={isEditing || timerStats.isBreakActive}
          onClick={toggleActive}
          color={"green"}
        >
          {timerStats.isTimerActive ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default Timer;
