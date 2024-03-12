import React, { useState } from "react";
import styles from "./HabitTrackerApp.module.css";
import HabitTrackerContainer from "./containers/HabitTrackerContainer";

const HabitTrackerApp = () => {
  const initialDays = ["mo", "tu", "we", "th", "fr", "sa", "su"];
  const [habits, setHabit] = useState([]);

  function handleNewHabit(habit) {
    setHabit((prev) => {
      return [...prev, habit];
    });
  }


  const habitsWithDisabledDays = habits.map((habit) => {
    const habitDays = initialDays.map((day) => {
      return habit.trackHabitOn.includes(day) ? day : null;
    });

    return {
      ...habit,
      trackHabitOn: habitDays,
    };
  });

  return (
    <div id="habitTracker" className={styles.container}>
      <HabitTrackerContainer
        handleNewHabit={handleNewHabit}
        habits={habitsWithDisabledDays}
      />
    </div>
  );
};

export default HabitTrackerApp;
