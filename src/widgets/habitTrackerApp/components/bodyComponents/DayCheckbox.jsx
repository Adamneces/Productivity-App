import React, { useState, useEffect } from "react";

const DayCheckbox = ({ label, value, onChange, checked }) => {
  const [isChecked, setChecked] = useState(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const handleCheckboxChange = (event) => {
    const newCheckedValue = event.target.checked;
    setChecked(newCheckedValue);

    onChange && onChange(newCheckedValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
      <label>{label}</label>
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default DayCheckbox;