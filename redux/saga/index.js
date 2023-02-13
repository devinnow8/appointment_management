import { all } from "redux-saga/effects";
import centerListSaga from "./center-list";
import holidayListSaga from "./holiday-list";
import appointmentSaga from "./appointment";
import applicationDetailsSaga from "./application-detail";
import categoryServiceListSaga from "./category-service";
import appointmentSlotListSaga from "./appointment-slot";
import appointmentDetailsSaga from "./appointment-details";
import rescheduleAppointmentSaga from "./reschedule-appointment";
import cancelAppointmentSaga from "./cancel-appointment";
import appointmentBookedSaga from "./appointment-booked";
import serviceListSaga from "./service-list";

const rootSaga = function* root() {
  yield all([
    centerListSaga(),
    holidayListSaga(),
    appointmentSaga(),
    applicationDetailsSaga(),
    categoryServiceListSaga(),
    appointmentSlotListSaga(),
    appointmentDetailsSaga(),
    rescheduleAppointmentSaga(),
    cancelAppointmentSaga(),
    appointmentBookedSaga(),
    serviceListSaga(),
  ]);
};
export default rootSaga;
