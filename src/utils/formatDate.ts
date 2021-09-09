export const timeStampToDate = (timeStamp: string) => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

export const getDuration = (timeStamp: string) => {
  const date = new Date(timeStamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${hour}:${minute}:${second}`;
};

export const getDate = (timeStamp: string | any) => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const getLatestDate = (timeStamp: any) => {
  return new Date(Math.max(...timeStamp.map((t: any) => new Date(t['start-time']))));
};
