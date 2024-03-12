import { createContext, useState, useEffect } from "react";

const initialStatsValues = {
  isTimerActive: false,
  isBreakActive: false,
  rounds: 1,
  userRounds: 1,
  timerFinished: false,
  pickedSound: null,
  initialValues: {
    timer: { hours: 0, minutes: 20, seconds: 0 },
    break: { minutes: 5, seconds: 0 },
  },
};

const TimerContext = createContext(initialStatsValues);

export const TimerProvider = ({ children }) => {
  const [timerStats, setTimerStats] = useState(initialStatsValues);
  const [initialValues, setInitialValues] = useState({
    timer: { hours: 0, minutes: 20, seconds: 0 },
    break: { minutes: 5, seconds: 0 },
  });

  useEffect(() => {
    if (timerStats.timerFinished) {
      setTimerStats((prev) => ({
        ...prev,
        pickedSound: null,
      }));
  
      document.title = "Productivity Manager";
    }
  }, [timerStats.timerFinished]);

  const handleTimerReset = (setState) => {
    setState({
      seconds: initialValues.timer.seconds,
      minutes: initialValues.timer.minutes,
      hours: initialValues.timer.hours,
    });
  };

  const handleBreakReset = (setState) => {
    setState({
      seconds: initialValues.break.seconds,
      minutes: initialValues.break.minutes,
    });
  };

  const contextValues = {
    timerStats,
    setTimerStats,
    initialValues,
    setInitialValues,
    handleTimerReset,
    handleBreakReset,
  }

  return (
    <TimerContext.Provider value={contextValues}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
