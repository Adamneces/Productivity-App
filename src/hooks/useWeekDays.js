const useWeekDays = () => {
  const today = new Date();
  const lastDay = new Date(today);
  lastDay.setDate(today.getDate() + (7 - today.getDay()));
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - today.getDay());

  return [today, firstDay, lastDay];
};

export default useWeekDays;
