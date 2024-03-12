import { createContext } from "react";
import { useState, useEffect } from "react";

const initialValues = {
  editedTasks: [],
  editedTasksIndex: null,
  handleDeleteTask: () => {},
  handleIsEditing: () => {},
  handleEditTask: () => {},
  handleFinishTask: () => {},
};

const TaskContext = createContext(initialValues);

export function TaskProvider({ children, toDos, setToDos }) {
  const [editedTasks, setEditedTasks] = useState([]);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);

  function handleDeleteTask(task) {
    setToDos((prev) => prev.filter((todo) => todo.taskID !== task.taskID));
  }

  function handleIsEditing(index) {
    setToDos((prev) => {
      return prev.map((todo, i) => {
        if (i === index) {
          return { ...todo, isEditing: !todo.isEditing };
        } else if (todo.isEditing) {
          return { ...todo, isEditing: false };
        }
        return todo;
      });
    });
    setEditedTaskIndex(index);
  }

  function handleEditTask(index) {
    setToDos((prev) => {
      const updatedToDos = [...prev];
      updatedToDos[index].task = editedTasks[index];
      return updatedToDos;
    });
    handleIsEditing(index);
    setEditedTaskIndex(null);
  }

  function handleFinishTask(index) {
    setToDos((prev) => {
      const updatedToDos = [...prev];
      updatedToDos[index].taskIsDone = !updatedToDos[index].taskIsDone;
      return updatedToDos;
    });
  }

  const contextValues = {
    editedTasks,
    setEditedTasks,
    editedTaskIndex,
    setEditedTaskIndex,
    handleDeleteTask,
    handleIsEditing,
    handleEditTask,
    handleFinishTask,
  };

  useEffect(() => {
    setEditedTasks(toDos.map((task) => task.task));
  }, [toDos]);

  return (
    <TaskContext.Provider value={contextValues}>
      {children}
    </TaskContext.Provider>
  );
}
export default TaskContext;
