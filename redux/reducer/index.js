import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import centerList from "./center-list";
import holidayList from "./holiday-list";
import appointmentSchedule from "./appointment";
import applicationDetails from "./application-detail";

const rootReducer = combineReducers({
  user,
  centerList,
  holidayList,
  appointmentSchedule,
  applicationDetails,
});

export default rootReducer;
