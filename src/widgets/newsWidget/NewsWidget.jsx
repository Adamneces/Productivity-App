import { useState, useEffect } from "react";
import styles from "./NewsWidget.module.css";
import { restClient } from "@polygon.io/client-js";

const rest = restClient(import.meta.env.VITE_STOCKS_API_KEY);

const stockNames = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "FB",
  "NVDA",
  "NFLX",
  "INTC",
  "AMD",
];

const getRandomStock = () => {
  return stockNames[Math.floor(Math.random() * stockNames.length)];
};

const NewsWidget = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const randomStock = getRandomStock();
    rest.stocks
      .dailyOpenClose(randomStock, "2023-03-31")
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((e) => {
        console.error("An error happened:", e);
      });
  }, []);

  return (
    <>
      {data ? (
        <div className={styles.container}>
          <div className={styles.left}>
            <h1>{data.symbol}</h1>
            <p>${data.close}</p>
          </div>
          <div className={styles.center}>
              <p>High: <span>${data.high}</span></p>
              <p>Low: <span>${data.low}</span></p>
              <p>Volume: <span>{data.volume}</span></p>
          </div>
          <div className={styles.right}>
            <p>Change: <span style={{color: 'green'}}>{((data.close / (data.open / 100)) / 100).toFixed(2)}%</span></p>
            <p>Date: <span>{data.from}</span></p>
            <p>Capital: <span>$ 41.5B</span></p>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
        <div className={styles.noData}>
        <h1>No available data..</h1>
        <p>Please try again later</p>
        </div>
        </div>
      )}
    </>
  );
};

export default NewsWidget;
