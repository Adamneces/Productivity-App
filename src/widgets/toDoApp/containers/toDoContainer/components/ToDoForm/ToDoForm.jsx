import { useContext, useState } from "react";
import ToDoContext from "../../store/ToDoContext";
import styles from "../../ToDo.module.css";

import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";

import Form from "./Form";

const ToDoForm = ({ setToDos }) => {
  const { newTask, setNewTask, newTask_defaultValue } = useContext(ToDoContext);
  const [formData, setFormData] = useState({
    showForm: false,
    color: "rgb(44, 44, 44)",
    priority: "rgb(44,44,44)",
    selectedDate: null,
    showCalendar: false,
  });

  function handleFormDataChange(key, value) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createTheTask();
    setNewTask(newTask_defaultValue);

    setFormData((prev) => {
      return {
        ...prev,
        showForm: false,
        color: "rgb(44,44,44)",
        priority: "rgb(44,44,44)",
      };
    });
  }

  function createTheTask() {
    setToDos((prev) => [
      ...prev,
      {
        ...newTask,
        taskID: uuidv4(),
      },
    ]);
  }

  return (
    <>
      {formData.showForm ? (
        <Form
          handleFormDataChange={handleFormDataChange}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div
          onClick={() => handleFormDataChange("showForm", true)}
          className={styles.toDoForm_createTaskButtonContainer}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className={styles.toDoForm_createTaskButton}
          />
        </div>
      )}
    </>
  );
};

export default ToDoForm;
