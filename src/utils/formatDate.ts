export const timeStampToDate = (timeStamp: string) => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${month}/${day}/${year} ${hour}:${minute}:${second}`;
};

export const getDuration = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const duration = end.getTime() - start.getTime();
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  // eslint-disable-next-line
  return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
};

export const getDate = (timeStamp: string | any) => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const getTodayTests = (timeStamp: any) => {
  const date = new Date();
  const today = date.toISOString();
  return timeStamp?.results?.filter((t: any) => t.startTime === today);
};
