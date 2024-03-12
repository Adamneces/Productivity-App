import { isWithinWeek, isSameDay, parseDate } from "../../../../../utilities/utilities";

// Sorting individual todos by priority/time
export function createSortingFunction(sortingParam) {
    function sortByPriorityAndStatus(taskA, taskB) {
      const priorityOrder = ["high", "medium", "low", "nopriority"];
      const priorityA = priorityOrder.indexOf(taskA.priority);
      const priorityB = priorityOrder.indexOf(taskB.priority);
  
      if (sortingParam === "priority") {
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
      } else if (sortingParam === "time") {
        const timeA = taskA.time
          ? new Date(`2000-01-01T${taskA.time}`)
          : new Date("2000-01-01T23:59");
        const timeB = taskB.time
          ? new Date(`2000-01-01T${taskB.time}`)
          : new Date("2000-01-01T23:59");
        return timeA - timeB;
      }
  
      return taskA.taskIsDone - taskB.taskIsDone;
    }
  
    return sortByPriorityAndStatus;
  }


  //displaying task for today/tomorrow/this wekk/all
  export function filterTasksByDate(displayTasks, sortedToDos) {
    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const lastDay = new Date(today);
    lastDay.setDate(today.getDate() + (7 - today.getDay()));

    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - today.getDay());

    switch (displayTasks) {
      case "today":
        return sortedToDos.filter((task) =>
          isSameDay(parseDate(task.date), today)
        );
      case "tomorrow":
        return sortedToDos.filter((task) =>
          isSameDay(parseDate(task.date), tomorrow)
        );
      case "week":
        return sortedToDos.filter((task) =>
          isWithinWeek(parseDate(task.date), firstDay, lastDay)
        );
      case "all":
        return sortedToDos;
      default:
        return sortedToDos;
    }
  }