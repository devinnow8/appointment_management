import { Config } from "./Config";
import { getDataApi } from "../ApiCaller";

export const getAppointmentSlotList = (centerId) => {
  const request = Config(centerId).getAppointmentSlotList;
  return getDataApi(request);
};
