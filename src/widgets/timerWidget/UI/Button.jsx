import React from "react";
import styles from "../TimerWidget.module.css";

const Button = ({ onClick, disabled, color, children }) => {
  const buttonColors = {
    blue: "rgb(27, 55, 71)",
    yellow: "rgb(68, 58, 24)",
    green: "rgb(32, 55, 16)",
    red: "rgb(72, 36, 24)",
  };

  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: buttonColors[color] }}
    >
      {children}
    </button>
  );
};

export default Button;
