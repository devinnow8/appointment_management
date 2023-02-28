import { Config } from "./Config";
import { putDataApi } from "../ApiCaller";

export const cancelAppointment = (details) => {
  const request = Config(details).cancelAppointment;
  const { appointmentId, ...data } = details;
  return putDataApi({
    path: request.path,
    data,
  });
};
