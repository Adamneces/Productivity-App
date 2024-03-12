import styles from "../ToDoApp.module.css";

import { isWithinWeek, isSameDay, parseDate } from "../utilities/utilities";
import useWeekDays from "../../../hooks/useWeekDays";
import TrackingBar from "../UI/TrackingBar";
import ProgressBar from "../UI/ProgressBar";

const Tracker = ({ toDos }) => {
  const completedTasks = toDos.filter((task) => task.taskIsDone);
  const [today, firstDay, lastDay] = useWeekDays();

  const todaysTasks = toDos.filter((task) => {
    const taskDate = new Date(task.date);
    return isSameDay(taskDate, today);
  });
  const todaysTasksCompleted = todaysTasks.filter((task) => task.taskIsDone);

  const tomorrowTasks = toDos.filter((task) => {
    const taskDate = new Date(task.date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(taskDate, tomorrow);
  });
  const tomorrowsTasksCompleted = tomorrowTasks.filter(
    (task) => task.taskIsDone
  );

  const withinWeekTasks = toDos.filter((task) =>
    isWithinWeek(parseDate(task.date), firstDay, lastDay)
  );
  const withinWeekTasksCompleted = withinWeekTasks.filter(
    (task) => task.taskIsDone
  );
  const progressPercentage = (
    (completedTasks.length / toDos.length) *
    100
  ).toFixed(1);

  return (
    <div className={styles.tracker_trackerContainer}>
      <TrackingBar className={styles.tracker_trackerLineContainer} label={"Tasks Completed:"} fontSize={"19px"} margin={"20px"}>
        {completedTasks.length}/{toDos.length}
      </TrackingBar>
      <TrackingBar className={styles.tracker_trackerLineContainer} label={"For today:"}>
        {todaysTasksCompleted.length}/{todaysTasks.length}
      </TrackingBar>
      <TrackingBar className={styles.tracker_trackerLineContainer} label={"For tomorrow:"}>
        {tomorrowsTasksCompleted.length}/{tomorrowTasks.length}
      </TrackingBar>
      <TrackingBar className={styles.tracker_trackerLineContainer} label={"This week:"}>
        {withinWeekTasksCompleted.length}/{withinWeekTasks.length}
      </TrackingBar>
      <TrackingBar className={styles.tracker_trackerLineContainer} label="Progress">
        {progressPercentage > 0 ? progressPercentage + "%" : "0"}
      </TrackingBar>

      <ProgressBar height='35px' progress={progressPercentage}/>
    </div>
  );
};

export default Tracker;
