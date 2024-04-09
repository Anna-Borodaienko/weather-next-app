import moment from 'moment';

export const getDayFromUnix = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format('ddd');
};
