import React from "react";
import styles from "../HabitTrackerApp.module.css";

const HabitTrackerHeader = ({ onShowForm }) => {
  const daysArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <div
      className={styles.habit_tracker_header}
      style={{
        borderRadius: onShowForm ? "12px" : "12px 12px 0 0",
        marginBottom: onShowForm ? "5px" : "0",
      }}
    >
      <div className={styles.habit_tracker_header_headingContainer}>
        <h2>Habit Tracker</h2>
      </div>
      <ul className={styles.habit_tracker_header_listContainer}>
        {daysArray.map((day) => {
          return <li key={day}>{day}</li>;
        })}
      </ul>
    </div>
  );
};

export default HabitTrackerHeader;
