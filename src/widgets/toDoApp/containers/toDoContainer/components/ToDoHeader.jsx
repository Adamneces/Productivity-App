import { useContext } from 'react';
import styles from '../ToDo.module.css';
import ToDoContext from '../store/ToDoContext';

const ToDoHeader = () => {
  const {setDisplayTasks, setFilterTasks} = useContext(ToDoContext);

  return (
    <nav className={styles.ToDoHeader_header}>
      <h1 className={styles.ToDoHeader_heading}>To-Do List</h1>
      <select 
      name="filterBy" 
      id="filterBy"
      onChange={(e) => setFilterTasks(e.target.value)}
      className={styles.ToDoHeader_dropdown}
      >
        <option value="priority">Priority</option>
        <option value="time">Time</option>
      </select>
      <select 
      name="displayTasks" 
      id="displayTasks" 
      onChange={(e) => setDisplayTasks(e.target.value)}
      className={styles.ToDoHeader_dropdown}
      >
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="week">This Week</option>
        <option value="all">All</option>
      </select>
    </nav>
  );
};
export default ToDoHeader;