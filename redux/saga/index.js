import { all } from "redux-saga/effects";
import centerListSaga from "./center-list";
import holidayListSaga from "./holiday-list";
import appointmentSaga from "./appointment";
import applicationDetailsSaga from "./application-detail";
import categoryServiceListSaga from "./category-service";
const rootSaga = function* root() {
  yield all([
    centerListSaga(),
    holidayListSaga(),
    appointmentSaga(),
    applicationDetailsSaga(),
    categoryServiceListSaga(),
  ]);
};
export default rootSaga;
