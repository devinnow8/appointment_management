import { Config } from "./Config";
import { putDataApi } from "../ApiCaller";

export const rescheduldeAppointment = (details) => {
  const request = Config(details).rescheduldeAppointment;
  const dateTime = {
    date: details.date,
    time: details.time,
  };
  return putDataApi({
    path: request.path,
    data: dateTime,
  });
};
