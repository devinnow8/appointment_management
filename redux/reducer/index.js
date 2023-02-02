import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import centerList from "./center-list";
import holidayList from "./holiday-list";
import appointmentSchedule from "./appointment";
import applicationDetails from "./application-detail";
import categoryServiceList from "./category-service";
import appointmentSlotList from "./appointment-slot";

const rootReducer = combineReducers({
  user,
  centerList,
  holidayList,
  appointmentSchedule,
  applicationDetails,
  categoryServiceList,
  appointmentSlotList,
});

export default rootReducer;
