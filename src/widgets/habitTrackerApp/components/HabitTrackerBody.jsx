import React from "react";
import styles from "../HabitTrackerApp.module.css";
import Habit from "./bodyComponents/Habit";
import Checkbox from "./bodyComponents/Checkbox.jsx";

const HabitTrackerBody = ({ habits }) => {
  const daysSample = ["mo", "tu", "we", "th", "fr", "sa", "su"];
  return (
    <div className={styles.habit_tracker_body}>
      {habits.length !== 0 ? (
        habits.map((habit) => {
          return (
            <Habit key={habit.name} name={habit.name} color={habit.color} description={habit.description}>
              {habit.trackHabitOn.map((day, index) => (
                <Checkbox
                  key={`${habit.name}-${day}-${index}`}
                  className={styles.checkbox}
                  day={day}
                />
              ))}
            </Habit>
          );
        })
      ) : (
        <Habit name={"Add your first habit"} color={"rgb(60,60,60)"}>
          {daysSample.map((day) => {
            return <Checkbox key={day} className={styles.checkbox} day={day} />;
          })}
        </Habit>
      )}
    </div>
  );
};

export default HabitTrackerBody;
