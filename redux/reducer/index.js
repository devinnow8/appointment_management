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
import appointmentBooked from "./appointment-booked";
import serviceList from "./service-list";
import orderController from "./order-conformation";

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
  appointmentBooked,
  serviceList,
  orderController,
});

export default rootReducer;
