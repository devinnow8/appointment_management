import config from './Config';
import { getDataApi } from '../ApiCaller';

export const getCenterList = () => {
  const request = config.getCenterList;
  return getDataApi(request);
};
