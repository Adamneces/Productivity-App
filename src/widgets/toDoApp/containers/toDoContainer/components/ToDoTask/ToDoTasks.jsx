import { useContext } from "react";
import styles from "../../ToDo.module.css";
import ToDoContext from "../../store/ToDoContext";
import Task from "./Task";
import { createSortingFunction, filterTasksByDate } from "./utilities/utilities";

const ToDoTask = ({ toDos }) => {
  const { displayTasks, filterTasks } = useContext(ToDoContext);

  const sortedToDos = toDos.sort(createSortingFunction(filterTasks));
  const filteredTasks = filterTasksByDate(displayTasks, sortedToDos);

  return (
    <ul className={styles.toDoTask_tasksContainer}>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <Task
            task={task}
            index={index}
          />
        ))
      ) : (
        <h3 className={styles.toDoTask_noTasksHeading}>
          Click on the '+' icon to add tasks!
        </h3>
      )}
    </ul>
  );
};

export default ToDoTask;
