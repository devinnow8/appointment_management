import { all } from "redux-saga/effects";
import centerListSaga from "./center-list";
import holidayListSaga from "./holiday-list";
import appointmentSaga from "./appointment";
import applicationDetailsSaga from "./application-detail";
import categoryServiceListSaga from "./category-service";
import appointmentSlotListSaga from "./appointment-slot";

const rootSaga = function* root() {
  yield all([
    centerListSaga(),
    holidayListSaga(),
    appointmentSaga(),
    applicationDetailsSaga(),
    categoryServiceListSaga(),
    appointmentSlotListSaga(),
  ]);
};
export default rootSaga;
