const getToday = (): string => {
  const date = new Date();
  return formattedDate(date);
};

const getPrevDay = (date: string): string => {
  let prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  return formattedDate(prevDate);
};

const getNextDay = (date: string): string => {
  let nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  return formattedDate(nextDate);
};

const formattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthStr = month.toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
};

export { getToday, getPrevDay, getNextDay };
