import { useState, useEffect } from "react";
import styles from "../ToDoApp.module.css";
import useLocation from "../../../hooks/useLocation";

import ForecastIcon from "../UI/ForecastIcon";
import WeatherDisplay from "../UI/WeatherDisplay";

const InfoWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const baseUrl = "http://api.weatherapi.com/v1";
  const userLocation = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl;

        if (userLocation) {
          apiUrl = `${baseUrl}/forecast.json?key=${apiKey}&q=${userLocation.latitude},${userLocation.longitude}&days=3&aqi=no&alerts=no`;
        } else {
          apiUrl = `${baseUrl}/forecast.json?key=${apiKey}&q=Torrevieja&days=3&aqi=no&alerts=no`;
        }
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error("Failed to fetch weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [userLocation]);

  return (
    <div className={styles.info_widget_container}>
      {weatherData ? (
        <>
          <WeatherDisplay weatherData={weatherData} />
          <div className={styles.info_widget_forecastContainer}>
            {weatherData.forecast.forecastday.map((forecastDay, index) => (
              <ForecastIcon
                key={index}
                forecastDay={forecastDay}
                index={index}
              />
            ))}
          </div>
        </>
      ) : (
        <span>no weather data available</span>
      )}
    </div>
  );
};

export default InfoWidget;
