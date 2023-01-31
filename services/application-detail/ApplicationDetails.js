import config from "./Config";
import { postDataApi } from "../ApiCaller";

export const applicationDetails = (details) => {
  const request = config.applicationDetails;
  return postDataApi({
    path: request.path,
    data: details,
  });
};
