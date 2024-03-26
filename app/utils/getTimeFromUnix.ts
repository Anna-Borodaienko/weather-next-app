import moment from 'moment';

export const getTimeFromUnix = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format('HH:mm');
};
