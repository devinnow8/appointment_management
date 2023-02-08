import config from './Config';
import { getDataApi } from '../ApiCaller';

export const appointmentBookedPdf = id => {
  const { path } = config.appointmentBookedPdf;
  return getDataApi({ path: path(id) });
};


