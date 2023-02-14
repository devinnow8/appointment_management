import { takeLatest } from "redux-saga/effects";
import {
  appointmentBookedPdfRequest,
  appointmentBookedChecklistRequest,
  appointmentBookedDetailsRequest,
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
  yield takeLatest(
    appointmentBookedDetailsRequest.type,
    appointmentBookedCrudSaga.appointmentBookedDetailsRequest,
  );
}

export default appointmentBookedSaga;
