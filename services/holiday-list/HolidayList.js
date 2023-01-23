import {Config} from './Config';
import { getDataApi } from '../ApiCaller';

export const getHolidayList = (centerId) => {
  const request = Config(centerId).getHolidayList;
  return getDataApi(request);
};
