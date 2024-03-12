import styles from "../../TimerWidget.module.css"

const SelectDropdown = ({ label, value, onChange, options }) => (
    <div className={styles.select_dropdown_labelSelect}>
      <label>{label}</label>
      <select value={value} onChange={(e) => {onChange((prevValue) => {
        return {
       ...prevValue,
          [label]: e.target.value,
        }
      })}}>
        {options.map((option) => (
          <option key={`${label}+${option}`} value={option}>
            {option < 10 ? `0${option}` : option}
          </option>
        ))}
      </select>
    </div>
  );

  export default SelectDropdown;