import React, { useState, useEffect } from "react";
import styles from "./NewsWidget.module.css";
import NewsCell from "./components/NewsCell";
import { iconLeft, iconRight } from "./UI/icons";

const NewsWidget = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('cz');
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    const apiKey = "71d0773531804f38971db720517245e6";

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const result = await response.json();
        setNewsData(result.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [country]);

  function handleNewsIndex(action){
    if (newsIndex === 0 && action === 'minus'){
        setNewsIndex(newsData.length - 1);
        return;
    }
    if (newsIndex === (newsData.length - 1) && action === 'plus'){
        setNewsIndex(0);
        return;
    }
    else if (action === 'plus'){
        setNewsIndex(prev => prev + 1);
    }
    else if (action ==='minus'){
        setNewsIndex(prev => prev - 1);
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.containerError}>
        <p className={styles.errorText}>Error: {error}</p>
        <p className={styles.subErrorText}>Please try again later...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.heading}>NEWS</p>
      <p className={styles.page}>{newsIndex + 1}/{newsData.length}</p>
      <select value={country} onChange={(e) => setCountry(e.target.value)} className={styles.country}>
        <option value="cz">CZ</option>
        <option value='us'>USA</option>
        <option value='sk'>SK</option>
        <option value="gb">GB</option>
        <option value="au">AU</option>
        <option value="ca">CA</option>
      </select>
      <button
        className={styles.button}
        onClick={() => handleNewsIndex('minus')}
      >
        {iconLeft}
      </button>
      <NewsCell
        title={newsData[newsIndex].title}
        url={newsData[newsIndex].url}
        date={newsData[newsIndex].publishedAt}
        author={newsData[newsIndex].author}
      />
      <button
        className={styles.button}
        onClick={() => handleNewsIndex('plus')}
      >
        {iconRight}
      </button>
    </div>
  );
};

export default NewsWidget;
