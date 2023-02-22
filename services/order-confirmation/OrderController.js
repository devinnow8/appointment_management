import config from "./Config";
import { postDataApi } from "../ApiCaller";

export const appointmentOrderRequest = (details) => {
  let obj = {
    currency: details.currency,
    amount: details.amount,
    appointment_details: details.appointment_details,
    date: details.date,
    day: details.day,
    from_time: details.from_time,
  };
  const { path } = config.appointmentOrder;
  return postDataApi({
    path: path(details),
    data: obj,
  });
};
export const confirmOrderRequest = (details) => {
  const { path } = config.confirmOrder;
  return postDataApi({
    path: path(details),
    data: details,
  });
};
