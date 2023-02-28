import { Config } from "./Config";
import { putDataApi } from "../ApiCaller";

export const rescheduldeAppointment = (details) => {
  const request = Config(details).rescheduldeAppointment;
  const { appointmentId, ...data } = details;
  return putDataApi({
    path: request.path,
    data,
  });
};
