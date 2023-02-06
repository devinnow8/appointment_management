import { Config } from "./Config";
import { putDataApi } from "../ApiCaller";

export const cancelAppointment = (details) => {
  const request = Config(details).cancelAppointment;
  const dateTime = {
    date: details.date,
    time: details.time,
  };
  return putDataApi({
    path: request.path,
    data: dateTime,
  });
};
