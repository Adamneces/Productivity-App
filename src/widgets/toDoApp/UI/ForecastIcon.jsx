import React from "react";
import { getDayOfWeek } from "../utilities/utilities";
import styles from "../ToDoApp.module.css";

const ForecastIcon = ({ forecastDay }) => {
  return (
    <div className={styles.info_widget_forecastDayContainer}>
      <div className={styles.info_widget_forecast_day_icon}>
        <p className={styles.info_widget_forecastDay}>
          {getDayOfWeek(forecastDay.date)}
        </p>
        <img
          className={styles.info_widget_forecastIcon}
          src={forecastDay.day.condition.icon}
          alt="Forecast Weather Icon"
        />
      </div>
      <span className={styles.info_widget_forecastTemp}>
        <span className={styles.minTemp}>{forecastDay.day.mintemp_c}</span>/
        {forecastDay.day.maxtemp_c}
      </span>
    </div>
  );
};

export default ForecastIcon;
