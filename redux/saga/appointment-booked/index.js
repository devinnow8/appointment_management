import { takeLatest } from "redux-saga/effects";
import {
  appointmentBookedPdfRequest,
  appointmentBookedChecklistRequest,
} from "../../reducer/appointment-booked";
import * as appointmentBookedCrudSaga from "./appointmentBooked";

function* appointmentBookedSaga() {
  yield takeLatest(
    appointmentBookedPdfRequest.type,
    appointmentBookedCrudSaga.appointmentBookedPdfRequest,
  );
  yield takeLatest(
    appointmentBookedChecklistRequest.type,
    appointmentBookedCrudSaga.appointmentBookedChecklistRequest,
  );
}

export default appointmentBookedSaga;
