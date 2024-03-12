import DatePicker from "react-datepicker";
import backgroundColors from "../../../../utilities/backgroundColors";
import styles from "../../ToDo.module.css"

import { useContext } from "react";
import ToDoContext from "../../store/ToDoContext";

const Form = ({handleSubmit, formData, setFormData, handleFormDataChange}) => {
    const {newTask,setNewTask, handleNewTaskChange} = useContext(ToDoContext);

    const handleDateChange = (date) => {
        setFormData((prev) => {
          return {
            ...prev,
            selectedDate: date,
            showCalendar: false,
          };
        });
        setNewTask((prev) => ({
          ...prev,
          date: date,
        }));
      };

  return (
    <form className={styles.toDoForm_formContainer} onSubmit={handleSubmit}>
          <input
            onChange={(event) => handleNewTaskChange("task", event)}
            name="task"
            type="text"
            autoFocus
            value={newTask.task}
            required
            placeholder="What's the task?"
            maxLength={70}
            className={styles.toDoForm_firstInput}
          />
          <textarea
            className={styles.toDoForm_textarea}
            onChange={(event) => handleNewTaskChange("description", event)}
            name="description"
            type="text"
            value={newTask.description}
            placeholder="Description..."
            maxLength={140}
          />
          <div className={styles.toDoForm_inputGroup}>
            <label htmlFor="time">Set time?</label>
            <input
              onChange={(event) => handleNewTaskChange("time", event)}
              name="time"
              type="time"
              value={newTask.time}
              className={styles.toDoForm_input}
              style={{ backgroundColor: "rgb(44, 44, 44)" }}
            />
          </div>

          <div className={styles.toDoForm_inputGroup}>
            <label htmlFor="date">Set date?</label>
            <div className={styles.toDoForm_btnContainer}>
              <input
                className={styles.toDoForm_dateButton}
                type="button"
                onClick={() =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      showCalendar: !prev.showCalendar,
                    };
                  })
                }
                style={{ display: formData.showCalendar ? "none" : "block" }}
                value={
                  formData.selectedDate
                    ? formData.selectedDate.toDateString() ===
                      new Date().toDateString()
                      ? "Today"
                      : formData.selectedDate.toDateString()
                    : "Today"
                }
              />
              {formData.showCalendar && (
                <DatePicker
                  className={styles.toDoForm_datepicker}
                  selected={formData.selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="dd.MM"
                />
              )}
            </div>
          </div>

          <div className={styles.toDoForm_inputGroup}>
            <label htmlFor="color">color:</label>
            <select
              onChange={(event) => handleNewTaskChange("color", event)}
              onClick={(e) =>
                handleFormDataChange("color", backgroundColors[e.target.value])
              }
              name="color"
              id="color"
              value={newTask.color}
              style={{ backgroundColor: formData.color }}
              className={styles.toDoForm_input}
            >
              <option value="default">default</option>
              <option value="green">green</option>
              <option value="yellow">yellow</option>
              <option value="purple">purple</option>
              <option value="turquoise">turquoise</option>
              <option value="brown">brown</option>
            </select>
          </div>
          <div className={styles.toDoForm_inputGroup}>
            <label htmlFor="priority">priority:</label>
            <select
              onChange={(event) => handleNewTaskChange("priority", event)}
              onClick={(e) =>
                handleFormDataChange(
                  "priority",
                  backgroundColors[e.target.value]
                )
              }
              name="priority"
              id="priority"
              value={newTask.priority}
              className={styles.toDoForm_input}
              style={{
                border: `2px solid ${formData.priority}`,
                backgroundColor: "rgb(44, 44, 44)",
              }}
            >
              <option value="nopriority">doesn't matter</option>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
          </div>

          <div className={styles.toDoForm_submit_closeButton_container}>
            <button type="submit" className={styles.toDoForm_submitButton}>
              submit
            </button>
            <button
              onClick={() => handleFormDataChange("showForm", false)}
              className={styles.toDoForm_formCloseButton}
            >
              close
            </button>
          </div>
        </form>
  )
}

export default Form
