import React from "react";
import styles from "../../HabitTrackerApp.module.css";

const Checkbox = ({ day }) => {
  return (
    <div className={styles.checkbox_inputContainer}>
      {day ? (
        <input
          className={styles.checkbox_input}
          type="checkbox"
          name={day}
        />
      ) : (
        <input
          type="checkbox"
          name={day}
          className={styles.checkbox_input}
          disabled
        />
      )}
    </div>
  );
};

export default Checkbox;
