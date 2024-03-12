import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialValues = {
  displayTasks: "today",
  filterTasks: "priority",
};
const newTask_defaultValue = {
  task: "",
  description: "",
  time: "",
  color: "default",
  priority: "nopriority",
  date: new Date(),
  taskID: uuidv4(),
};

const ToDoContext = createContext(initialValues);

export function ToDoProvider({ children }) {
  const [displayTasks, setDisplayTasks] = useState("today");
  const [filterTasks, setFilterTasks] = useState("priority");
  const [newTask, setNewTask] = useState(newTask_defaultValue);

  function handleSetDisplayTasks(date) {
    setDisplayTasks(date);
  }
  function handleNewTaskChange(key, event) {
    setNewTask((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  }

  const contextValues = {
    newTask,
    setNewTask,
    displayTasks,
    setDisplayTasks,
    filterTasks,
    setFilterTasks,
    handleSetDisplayTasks,
    newTask_defaultValue,
    handleNewTaskChange,
  };

  return (
    <ToDoContext.Provider value={contextValues}>
      {children}
    </ToDoContext.Provider>
  );
}

export default ToDoContext;
