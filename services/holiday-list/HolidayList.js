import config from './Config';
import { getDataApi } from '../ApiCaller';

export const getHolidayList = () => {
  const request = config.getHolidayList;
  return getDataApi(request);
};
