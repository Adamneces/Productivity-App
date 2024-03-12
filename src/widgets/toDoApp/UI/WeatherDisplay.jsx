import styles from "../ToDoApp.module.css";

const WeatherDisplay = ({ weatherData }) => {
  return (
    <>
      <h1 className={styles.info_widget_heading}>
        {weatherData.location.name} - {weatherData.location.country}
      </h1>
      <div className={styles.info_widget_infoContainer}>
        <p className={styles.info_widget_currentTemperature}>
          {weatherData.current.temp_c}°C
        </p>
        <img
          className={styles.info_widget_icon}
          src={weatherData.current.condition.icon}
          alt="Current Weather Icon"
        />
      </div>
    </>
  );
};

export default WeatherDisplay;
