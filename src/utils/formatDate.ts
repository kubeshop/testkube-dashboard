import moment from "moment";

export const timeStampToDate = (timeStamp: string) => {
  return moment(timeStamp).format('MM-DD-YYYY hh:mm:ss').toString();
};

export const getDuration = (startTime: string, endTime: string) => {
  let duration = moment(endTime).diff(startTime);
  // endTime already set to some value
  if (duration < 0) {
    duration = moment().diff(startTime);
  }
  return moment.utc(duration).format('mm:ss');
};

export const getDate = (timeStamp: string | any) => {
  return moment(timeStamp).format('MM-DD-YYYY');
};

export const getTodayTests = (timeStamp: any) => {
  const date = new Date();
  const today = date.toISOString();
  return timeStamp?.results?.filter((t: any) => t.startTime === today);
};
