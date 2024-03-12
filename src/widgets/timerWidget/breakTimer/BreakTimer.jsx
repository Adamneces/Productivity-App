import React, { useContext, useEffect, useState } from "react";
import styles from "../TimerWidget.module.css";
import SelectDropdown from "../timer/components/SelectDropDown";
import { sixtyArray, hoursArray } from "../utilities/utilities.js";
import Button from "../UI/Button.jsx";

import TimerContext from "../store/TimerContext.jsx";

const BreakTimer = () => {
  const {timerStats, setTimerStats, initialValues, setInitialValues, handleBreakReset} = useContext(TimerContext); 

  const [breakTime, setBreakTime] = useState(initialValues.break);
  const [isEditing, setIsEditing] = useState(false);

  const audio = timerStats.pickedSound ? new Audio(timerStats.pickedSound) : null;

  function toggleEditing() {
    setIsEditing((prev) => !prev);
    setInitialValues((prev) => {
      return {
        ...prev,
        break: {
          seconds: breakTime.seconds,
          minutes: breakTime.minutes,
        },
      };
    });
  }

  function toggleActive() {
    setTimerStats((prev) => {
      return {
     ...prev,
        isBreakActive:!prev.isBreakActive,
      };
    })
  }

  useEffect(() => {
    let interval;

    if (timerStats.isBreakActive) {
      document.title = `Break - ${
        breakTime.minutes < 10 ? "0" + breakTime.minutes : breakTime.minutes
      }:${
        breakTime.seconds < 10 ? "0" + breakTime.seconds : breakTime.seconds
      }`;
    } else if (breakTime !== initialValues.break) {
      document.title = "Timer Paused";
    } else {
      document.title = "Productivity Manager";
    }

    if (timerStats.isBreakActive) {
      interval = setInterval(() => {
        setBreakTime((prevValue) => {
          const newSeconds =
            prevValue.seconds === 0 ? 59 : prevValue.seconds - 1;
          const newMinutes =
            prevValue.seconds === 0 && prevValue.minutes > 0
              ? prevValue.minutes - 1
              : prevValue.minutes;

          if (newSeconds < 1 && newMinutes < 1) {
            if (timerStats.rounds === timerStats.userRounds) {
              setBreakTime(initialValues.break);
            }

            setTimerStats((prev) => {
              return{
                ...prev,
                isTimerActive: prev.rounds === prev.userRounds ? false : true,
                rounds: prev.rounds + 1,
                timerFinished: prev.rounds === prev.userRounds ? true : false,
                isBreakActive: false,
              }
            })
            handleBreakReset(setBreakTime);
            clearInterval(interval);
            if (audio) {
              audio.play();
            }
          }
          return {
            seconds: newSeconds,
            minutes: newMinutes,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [breakTime, timerStats]);

  return (
    <div className={styles.break_timer_container}>
      <h4 className={styles.break_timer_heading}>Break</h4>
      {isEditing ? (
        <div className={styles.break_timer_labelSelectContainer}>
          {Object.keys(breakTime).map((key) => (
            <SelectDropdown
              key={key}
              label={key}
              value={breakTime[key]}
              onChange={setBreakTime}
              options={sixtyArray}
            />
          ))}
        </div>
      ) : (
        <p className={styles.break_timer_time}>
          <span>
            {breakTime.minutes < 10
              ? `0${breakTime.minutes}`
              : breakTime.minutes}
          </span>
          :
          <span>
            {breakTime.seconds === 60
              ? "00"
              : breakTime.seconds < 10
              ? `0${breakTime.seconds}`
              : breakTime.seconds}
          </span>
        </p>
      )}
      <div>
        <Button
          color="blue"
          onClick={toggleEditing}
          disabled={timerStats.isTimerActive || timerStats.isBreakActive}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          color="yellow"
          disabled={isEditing || timerStats.isTimerActive}
          onClick={() => handleBreakReset(setBreakTime)}
        >
          Reset
        </Button>
        <Button
          color="red"
          disabled={
            isEditing ||
            timerStats.isTimerActive ||
            (!timerStats.isTimerActive &&
              !timerStats.isBreakActive &&
              breakTime === initialValues.break)
          }
          onClick={toggleActive}
        >
          {timerStats.isBreakActive ? "Stop" : "Resume"}
        </Button>
      </div>
    </div>
  );
};

export default BreakTimer;
