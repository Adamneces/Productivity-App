import React from "react";
import styles from "../ToDoApp.module.css";
import TrackingBar from "../UI/TrackingBar";
import { isSameDay } from "../utilities/utilities";
import ProgressBar from "../UI/ProgressBar";

const DailyTracker = ({ toDos }) => {
  const today = new Date();
  const todaysTasks = toDos.filter((task) => isSameDay(new Date(task.date), today));
  const completedTasks = todaysTasks.filter((task) => task.taskIsDone);

  const priorities = ["high", "medium", "low", "nopriority"];

  const getPriorityCount = (priority) => {
    const completedCount = completedTasks.filter((task) => task.priority === priority).length;
    const totalCount = todaysTasks.filter((task) => task.priority === priority).length;
    return `${completedCount}/${totalCount}`;
  };

  const progress = (completedTasks.length / todaysTasks.length) * 100;

  return (
    <div className={styles.daily_tracker_container}>
      <TrackingBar fontSize="19px" margin="10px" className={styles.daily_tracker_lineContainer} label="Today's tasks:">
        {completedTasks.length}/{todaysTasks.length}
      </TrackingBar>

      {priorities.map((priority) => (
        <TrackingBar key={priority} className={styles.daily_tracker_lineContainer} label={`${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority:`}>
          {getPriorityCount(priority)}
        </TrackingBar>
      ))}
      <ProgressBar height={'25px'} progress={progress} />
    </div>
  );
};

export default DailyTracker;
