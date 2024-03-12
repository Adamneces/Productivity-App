import styles from "./ToDo.module.css";

import ToDoHeader from "./components/ToDoHeader";
import ToDoBody from "./components/ToDoBody";
import ToDoForm from "./components/ToDoForm/ToDoForm";

import { ToDoProvider } from "./store/ToDoContext";

const ToDo = (props) => {

  return (
    <div className={styles.ToDoContainer}>
      <ToDoProvider>
        <ToDoHeader />
        <ToDoBody toDos={props.toDos} setToDos={props.setToDos} />
        <ToDoForm setToDos={props.setToDos} />
      </ToDoProvider>
    </div>
  );
};

export default ToDo;
