//Colors for the habit background
export const selectColors = {
  Default: "",
  "Ocean Blue": "rgba(52, 152, 219, 0.75)",
  "Emerald Green": "rgba(46, 204, 113, 0.75)",
  "Amethyst Purple": "rgba(155, 89, 182, 0.75)",
  "Sunflower Yellow": "rgba(241, 196, 15, 0.75)",
  "Coral Pink": "rgba(231, 76, 60, 0.75)",
  "Turquoise Blue": "rgba(26, 188, 156, 0.75)",
  "Ruby Red": "rgba(192, 57, 43, 0.75)",
  "Forest Green": "rgba(44, 62, 80, 0.75)",
  "Cinnamon Brown": "rgba(211, 84, 0, 0.75)",
  "Sky Blue": "rgba(135, 206, 235, 0.75)",
};

//all the days for calculations, atd...
export const days = {
  allDays: ["mo", "tu", "we", "th", "fr", "sa", "su"],
  weekDays: ["mo", "tu", "we", "th", "fr"],
  weekends: ["sa", "su"],
};
export const daysLabels = [
  { value: "mo", label: "Monday" },
  { value: "tu", label: "Tuesday" },
  { value: "we", label: "Wednesday" },
  { value: "th", label: "Thursday" },
  { value: "fr", label: "Friday" },
  { value: "sa", label: "Saturday" },
  { value: "su", label: "Sunday" },
];

//helper functions....
export function removeDuplicates(array) {
  const seenValues = new Set();
  const uniqueArray = array.filter((value) => {
    if (seenValues.has(value)) {
      return false;
    }
    seenValues.add(value);
    return true;
  });

  return uniqueArray;
}

export function sortDaysInArray(a, b) {
  const order = { mo: 0, tu: 1, we: 2, th: 3, fr: 4, sa: 5, su: 6 };
  return order[a] - order[b];
}

//function for what should be displayed on the button - based on what user selects
export function renderSelectedDaysText(selectedDays) {
    const allDays = days.allDays;
    const weekDays = days.weekDays;
    const weekends = days.weekends;

    if (selectedDays.length === 0) {
      return "no days selected";
    } else if (selectedDays.length === allDays.length) {
      return "Every day";
    } else if (
      selectedDays.length === weekDays.length &&
      selectedDays.every((day) => weekDays.includes(day))
    ) {
      return "Every weekday";
    } else if (
      selectedDays.length === weekends.length &&
      selectedDays.every((day) => weekends.includes(day))
    ) {
      return "On weekends";
    } else {
      return `Every ${selectedDays.join(", ")}`;
    }
  }

  //functions for checking/unchecking checkboxes

  export function handleDayCheckboxChange(day, isChecked, setFunction, key) {
    if (isChecked) {
      setFunction((prevValue) => ({
        ...prevValue,
        [key]: [...prevValue[key], day], 
      }));
    } else {
      setFunction((prevValue) => ({
        ...prevValue,
        [key]: prevValue[key].filter((d) => d !== day),
      }));
    }
  }
  
  export function handleAllDaysCheckboxChange(days, isChecked, setFunction, key) {
    if (isChecked) {
      setFunction((prevValue) => ({
        ...prevValue,
        [key]: [...prevValue[key], ...days], 
      }));
    } else {
      setFunction((prevValue) => ({
        ...prevValue,
        [key]: prevValue[key].filter((d) => !days.includes(d)),
      }));
    }
  }