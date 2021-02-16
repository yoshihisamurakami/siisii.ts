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

const formattedDatetime = (date: Date): string => {
  const fmDate = formattedDate(date);
  console.log('fmDate => ' + fmDate);
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `${fmDate} ${hour}:${minute}:${second}`;
};

// 引数で与えられた日付＋時刻が未来だったらtrueを返す
function isFuture(datetime: string): boolean {
  const datetime_with_second = datetime + ':00';
  const right_datetime = datetime_with_second.replace(/-/g, '/');
  const paramDate = new Date(right_datetime);
  const now = new Date();

  return paramDate > now;
}

// 引数で与えられた日付＋時刻の24時間前の日付＋時刻を返す
const getPrevDateTime = (datetime: string): string => {
  const datetime_with_second = datetime + ':00';
  const right_datetime = datetime_with_second.replace(/-/g, '/');
  let prevDate = new Date(right_datetime);

  prevDate.setDate(prevDate.getDate() - 1);
  return formattedDatetime(prevDate);
};

export { getToday, getPrevDay, getNextDay, isFuture, getPrevDateTime };
