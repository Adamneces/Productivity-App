import React, { useState, useRef } from "react";
import styles from "../../HabitTrackerApp.module.css";
import DayCheckbox from "./DayCheckbox";
import {
  daysLabels,
  days,
  selectColors,
  removeDuplicates,
  sortDaysInArray,
  renderSelectedDaysText,
  handleDayCheckboxChange,
  handleAllDaysCheckboxChange
} from "../../utilities/utilities.js";
import Input from "../../UI/Input.jsx";

const HabitForm = ({ handleNewHabit, onCloseForm }) => {
  const dialog = useRef();
  const [expandedDays, setExpandedDays] = useState(false);
  const [habit, setHabit] = useState({
    name: "",
    trackHabitOn: [],
    description: "",
    color: "",
  });
  let selectedDays = habit.trackHabitOn;
  let filteredSelectedDays =
    removeDuplicates(selectedDays).sort(sortDaysInArray);

  function handleSubmit(event) {
    if (habit.trackHabitOn.length === 0) {
      dialog.current.showModal();
      event.preventDefault();
      return;
    }
    event.preventDefault();
    handleNewHabit(habit);

    setHabit({
      name: "",
      trackHabitOn: [],
      description: "",
    });
    onCloseForm(false);
  }

  function handleHabitChange(part, e) {
    setHabit({
      ...habit,
      [part]: e.target.value,
    });
  }

  function handleCloseDialog() {
    dialog.current.close();
  }

  return (
    <div className={styles.habit_form_habitFormContainer}>
      <dialog className={styles.habit_form_dialog} ref={dialog}>
        <p>Please select at least one day</p>
        <button
          className={styles.habit_form_dialogBtn}
          onClick={handleCloseDialog}
        >
          Close
        </button>
      </dialog>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className={styles.habit_form_form}
      >
        <Input
          type="text"
          name="name"
          placeholder="Name of the Habit"
          value={habit.name}
          onChange={(e) => handleHabitChange("name", e)}
        />
        <Input
          onChange={(e) => handleHabitChange("description", e)}
          name="description"
          TextArea
          placeholder="Description"
          value={habit.description}
        />
        <div className={styles.habit_form_selectColorContainer}>
          <label>Select Color:</label>
          <select
            onChange={(e) => handleHabitChange("color", e)}
            style={{ background: habit.color }}
            className={styles.habit_form_colorDropDown}
          >
            {Object.entries(selectColors).map(([colorName, hexCode]) => (
              <option key={hexCode} value={hexCode}>
                {colorName}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{ borderRadius: expandedDays ? "10px 10px 0 0" : "10px" }}
          className={styles.habit_form_labelButtonContainer}
        >
          <label>Track habit on:</label>
          <div
            onClick={() => setExpandedDays((prev) => !prev)}
            className={styles.habit_form_daysButton}
          >
            {renderSelectedDaysText(filteredSelectedDays)}
          </div>
        </div>
        <div className={styles.habit_form_daysContainer}>
          <div
            style={{ visibility: expandedDays ? "visible" : "hidden" }}
            className={styles.habit_form_individualDaysContainer}
          >
            <DayCheckbox
              label="Select all days"
              value=""
              onChange={(isChecked) =>
                handleAllDaysCheckboxChange(days.allDays, isChecked, setHabit, 'trackHabitOn')
              }
              checked={habit.trackHabitOn === days.allDays}
            />
            <DayCheckbox
              label="Select all weekdays"
              value=""
              onChange={(isChecked) =>
                handleAllDaysCheckboxChange(days.weekDays, isChecked, setHabit, 'trackHabitOn')
              }
              checked={habit.trackHabitOn === days.weekDays}
            />
            <br />
            {daysLabels.map((day) => {
              return (
                <DayCheckbox
                  key={day.label}
                  label={day.label}
                  value={day.value}
                  onChange={(isChecked) =>
                    handleDayCheckboxChange(day.value, isChecked, setHabit, 'trackHabitOn')
                  }
                  checked={habit.trackHabitOn.includes(day.value)}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.habit_form_buttonsContainer}>
          <button className={styles.habit_form_submitButton} type="submit">
            Add Habit
          </button>
          <button
            className={styles.habit_form_closeButton}
            onClick={() => onCloseForm(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
