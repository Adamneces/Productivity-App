import ToDoTasks from "./ToDoTask/ToDoTasks";
import styles from "../ToDo.module.css";

import { TaskProvider } from "../store/TaskContext";

const ToDoBody = ({ toDos, setToDos }) => {
  return (
    <div className={styles.toDoBody_tasksContainer}>
      <TaskProvider toDos={toDos} setToDos={setToDos}>
        <ToDoTasks toDos={toDos} setToDos={setToDos} />
      </TaskProvider>
    </div>
  );
};

export default ToDoBody;
