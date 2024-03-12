import React, { useState } from "react";
import styles from "../HabitTrackerApp.module.css";
import HabitTrackerHeader from "../components/HabitTrackerHeader";
import HabitTrackerBody from "../components/HabitTrackerBody";
import HabitForm from "../components/bodyComponents/HabitForm";

const HabitTrackerContainer = ({ habits, handleNewHabit }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.habit_tracker_container_container}>
      <HabitTrackerHeader onShowForm={showForm} />
      {showForm ? (
        <HabitForm onCloseForm={setShowForm} handleNewHabit={handleNewHabit} />
      ) : (
        <HabitTrackerBody
          onShowForm={setShowForm}
          handleNewHabit={handleNewHabit}
          habits={habits}
        />
      )}
      <button
        style={{ display: showForm ? "none" : "flex" }}
        className={styles.habit_tracker_container_showFormButton}
        onClick={() => setShowForm(true)}
      >
        +
      </button>
    </div>
  );
};

export default HabitTrackerContainer;
