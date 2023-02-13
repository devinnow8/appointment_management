import { Config } from "./Config";
import { getDataApi } from "../ApiCaller";

export const serviceList = (details) => {
  const request = Config(details).serviceList;
  return getDataApi({
    path: request.path,
  });
};
