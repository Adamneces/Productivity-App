import React from "react";
import styles from "../HabitTrackerApp.module.css";

const Input = ({ TextArea, onChange, value, ...props }) => {
  return (
    <>
      {TextArea ? (
        <textarea
          value={value}
          className={styles.habit_form_inputs}
          onChange={onChange}
          {...props}
          maxLength={90}
        />
      ) : (
        <input
          onChange={onChange}
          required
          maxLength={26}
          className={styles.habit_form_inputs}
          value={value}
          {...props}
        />
      )}
    </>
  );
};

export default Input;
