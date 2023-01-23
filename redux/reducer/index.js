import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import centerList from './center-list'
import holidayList from "./holiday-list";
const rootReducer = combineReducers({
  user,
  centerList,
  holidayList
});

export default rootReducer;
