import config from "./Config";
import { postDataApi } from "../ApiCaller";

export const appointmentOrderRequest = (details) => {
  const { path } = config.appointmentOrder;
  return postDataApi({
    path: path(details),
    data: details,
  });
};
export const confirmOrderRequest = (details) => {
  const { path } = config.confirmOrder;
  return postDataApi({
    path: path(details),
    data: details,
  });
};
