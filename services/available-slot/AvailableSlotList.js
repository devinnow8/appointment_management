import { Config } from "./Config";
import { getDataApi } from "../ApiCaller";

export const getAvailableSlotList = (details) => {
  const request = Config(details).getAvailableSlotList;
  return getDataApi(request);
};
