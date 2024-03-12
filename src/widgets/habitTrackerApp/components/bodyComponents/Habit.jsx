import React from "react";
import styles from "../../HabitTrackerApp.module.css";
import { infoIcon } from "../../UI/icons";

const Habit = ({ name, children, color, description }) => {

  return (
    <div
      style={{
        background: `linear-gradient(90deg, transparent, ${color} 25%)`,
      }}
      className={styles.habit_container}
    >
      <p className={styles.habit_habitName}>{name}</p>
      <span className={styles.habit_habitInfoIcon}>{infoIcon}</span>
      <div style={{background: `linear-gradient(90deg, rgb(47, 47, 47) 85%, transparent)`}} className={styles.habit_habitDescription}>
        <p>{description}</p>
      </div>
      <div className={styles.habit_checkboxesContainer}>{children}</div>
    </div>
  );
};

export default Habit;
