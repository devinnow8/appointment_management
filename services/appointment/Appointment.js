import { Config } from "./Config";
import { postDataApi } from "../ApiCaller";

export const appointmentSchedule = (details) => {
  const request = Config(details[0].center_id).appointmentSchedule;
  return postDataApi({
    path: request.path,
    data: details,
  });
};
