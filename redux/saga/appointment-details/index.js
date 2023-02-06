import { put, takeLatest } from "redux-saga/effects";
import {
  appointmentDetailsFetchRequest,
  appointmentDetailsFetchSuccess,
} from "../../reducer/appointment-details";

function* getAppointmentDetailsRequest(action) {
  yield put(appointmentDetailsFetchSuccess(action.payload.requestBody));
}

function* appointmentDetailsSaga() {
  yield takeLatest(
    appointmentDetailsFetchRequest.type,
    getAppointmentDetailsRequest,
  );
}

export default appointmentDetailsSaga;
