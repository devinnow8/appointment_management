import config from "./Config";
import { getDownloadData } from "../ApiCaller";

export const appointmentBookedPdf = (id) => {
  const { path } = config.appointmentBookedPdf;
  return getDownloadData({ path: path(id) });
};
