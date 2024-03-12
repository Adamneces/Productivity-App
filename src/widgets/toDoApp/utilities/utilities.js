export function parseDate(date) {
  return date instanceof Date ? date : new Date(date);
}
export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
export function isWithinWeek(date, startOfWeek, endOfWeek) {
  return date >= startOfWeek && date <= endOfWeek;
}

export function formatDate(task) {
  return task.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });
}

export const getDayOfWeek = (dateString) => {
  const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  const dateObj = new Date(dateString);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  return dayOfWeek;
};
