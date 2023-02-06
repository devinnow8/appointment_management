import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import centerList from "./center-list";
import holidayList from "./holiday-list";
import appointmentSchedule from "./appointment";
import applicationDetails from "./application-detail";
import categoryServiceList from "./category-service";
import appointmentSlotList from "./appointment-slot";
import appointmentDetails from "./appointment-details";
import rescheduleAppointment from "./reschedule-appointment";
import cancelAppointment from "./cancel-appointment";

const rootReducer = combineReducers({
  user,
  centerList,
  holidayList,
  appointmentSchedule,
  applicationDetails,
  categoryServiceList,
  appointmentSlotList,
  appointmentDetails,
  rescheduleAppointment,
  cancelAppointment,
});

export default rootReducer;
