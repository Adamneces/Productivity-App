import ToDoApp from "./widgets/toDoApp/ToDoApp";
import "../src/index.css";
import HabitTrackerApp from "./widgets/habitTrackerApp/HabitTrackerApp";
import TimerWidget from "./widgets/timerWidget/TimerWidget";

import { TimerProvider } from "./widgets/timerWidget/store/TimerContext";
import NewsWidget from "./widgets/newsWidget/NewsWidget";

function App() {
  return (
    <div className="container">
      <nav className="navigation">
        <ul>
          <li>
            <a href="#todoApp">To-Do</a>
          </li>
          <li>
            <a href="#habitTracker">Habit</a>
          </li>
          <li>
            <a href="#news">News</a>
          </li>
          <li>
            <a href="#timer">Timer</a>
          </li>
        </ul>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="rightIcon"
          className="icon icon-tabler icon-tabler-arrow-badge-right"
          width="45"
          height="45"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
        </svg>
      </nav>
      <ToDoApp />
      <HabitTrackerApp />
      <div className="smallerWidgetsContainer">
        <div id="news" className="timerContainer">
          <NewsWidget />
        </div>
        <div id="timer" className="newsContainer">
          <TimerProvider>
            <TimerWidget />
          </TimerProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
