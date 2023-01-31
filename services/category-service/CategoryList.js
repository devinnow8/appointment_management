import config from "./Config";
import { getDataApi } from "../ApiCaller";

export const getCategoryServiceList = () => {
  const request = config.getCategoryServiceList;
  return getDataApi(request);
};
