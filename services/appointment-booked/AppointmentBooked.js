import config from "./Config";
import { getDownloadData } from "../ApiCaller";

export const appointmentBookedPdf = (id) => {
  const { path } = config.appointmentBookedPdf;
  return getDownloadData({ path: path(id) });
};
export const appointmentBookedChecklist = (details) => {
  const { path } = config.appointmentBookedChecklist;
  return getDownloadData({ path: path(details) });
};
