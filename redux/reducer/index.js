import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import centerList from './center-list'
import holidayList from "./holiday-list";
import appointmentSchedule from './appointment'

const rootReducer = combineReducers({
  user,
  centerList,
  holidayList,
  appointmentSchedule
});

export default rootReducer;
