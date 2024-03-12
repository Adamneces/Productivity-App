import React from "react";
import styles from "../NewsWidget.module.css";
import { formatDate } from "../utilities/utilities";

const NewsCell = ({ title, url, date, author }) => {
  const newDate = formatDate(date);

  return (
    <div className={styles.newsCell_container}>
      <h3 className={styles.newsCell_heading}>{title}</h3>
      <a className={styles.newsCell_link} href={url} target="_blank">
        <p>source link </p>
        <p>{author}</p>
      </a>
      <p className={styles.newsCell_dateParagraph}>
        Published: <span className={styles.newsCell_date}>{newDate}</span>
      </p>
    </div>
  );
};

export default NewsCell;
