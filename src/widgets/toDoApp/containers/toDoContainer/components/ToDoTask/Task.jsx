import styles from "../../ToDo.module.css";
import backgroundColors from "../../../../utilities/backgroundColors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faRotateLeft,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../../utilities/utilities";
import { useContext } from "react";
import TaskContext from "../../store/TaskContext";

const Task = ({ task, index }) => {
  const {
    editedTasks,
    setEditedTasks,
    editedTaskIndex,
    setEditedTaskIndex,
    handleDeleteTask,
    handleIsEditing,
    handleEditTask,
    handleFinishTask,
  } = useContext(TaskContext);
  
  const today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <div
      className={
        task.isEditing
          ? styles.toDoTask_taskContainerEditing
          : styles.toDoTask_taskContainer
      }
      key={task.taskID}
      style={{
        background: `linear-gradient(90deg, transparent 0%, ${
          backgroundColors[`task${task.color}`]
        } 15%)`,
        borderLeft:
          !task.isEditing && `4px solid ${backgroundColors[task.priority]}`,
      }}
    >
      <div className={styles.toDoTask_taskMainTextContainer}>
        <input
          className={styles.toDoTask_checkboxInput}
          type="checkbox"
          checked={task.taskIsDone}
          disabled={task.taskIsDone}
          onClick={() => handleFinishTask(index)}
        />
        {task.isEditing ? (
          <input
            autoFocus={editedTaskIndex === index}
            className={styles.toDoTask_input}
            type="text"
            value={editedTasks[index]}
            onChange={(e) => {
              const newEditedTasks = [...editedTasks];
              newEditedTasks[index] = e.target.value;
              setEditedTasks(newEditedTasks);
            }}
          />
        ) : (
          <div className={styles.toDoTask_taskParagraphContainer}>
            <p
              className={
                task.taskIsDone
                  ? styles.toDoTask_taskIsDone
                  : styles.toDoTask_task
              }
            >
              {task.task}
            </p>
            {task.taskIsDone ? null : (
              <p className={styles.toDoTask_priorityText}>
                {task.priority !== "nopriority" ? task.priority : ""}
              </p>
            )}
          </div>
        )}
        {task.taskIsDone ? (
          <div>
            <FontAwesomeIcon
              icon={faRotateLeft}
              className={styles.toDoTask_deleteIcon}
              onClick={() => handleFinishTask(index)}
            />
            <button onClick={() => handleDeleteTask(task)}>
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.toDoTask_deleteIcon}
              />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                if (task.isEditing) {
                  handleEditTask(index);
                } else {
                  handleIsEditing(index);
                  setEditedTaskIndex(index);
                }
              }}
            >
              {task.isEditing ? (
                <FontAwesomeIcon
                  icon={faDownload}
                  className={styles.toDoTask_editIcon}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={styles.toDoTask_editIcon}
                />
              )}
            </button>
            <button onClick={() => handleDeleteTask(task)}>
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.toDoTask_deleteIcon}
              />
            </button>
          </>
        )}
      </div>
      {!task.taskIsDone && !task.isEditing && (
        <div className={styles.toDoTask_taskAdditionalTextContainer}>
          <p>
            {formatDate(task.date) === formatDate(today)
              ? "today"
              : formatDate(task.date) === formatDate(tomorrow)
              ? "tomorrow"
              : formatDate(task.date)}
          </p>
          <p>{task.time}</p>
        </div>
      )}
    </div>
  );
};

export default Task;
