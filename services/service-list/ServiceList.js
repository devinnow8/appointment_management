import { Config } from "./Config";
import { getDataApi } from "../ApiCaller";

export const serviceList = (details) => {
  const request = Config(details).serviceList;
  console.log(details, "detailsdetails=>", request);
  return getDataApi({
    path: request.path,
  });
};
