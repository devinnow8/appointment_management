import { call, put, takeLatest } from "redux-saga/effects";
import {
  cancelAppointmentFetchRequest,
  cancelAppointmentFetchSuccess,
  cancelAppointmentFetchFailure,
} from "../../reducer/cancel-appointment";
import * as services from "../../../services";
import { toast } from "react-toastify";

function* getCancelAppointmentRequest(action) {
  try {
    const response = yield call(
      services.cancelAppointment,
      action.payload.requestBody,
    );
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(cancelAppointmentFetchSuccess(data));
      action.payload.successCalback(response);
    } else {
      yield put(cancelAppointmentFetchFailure());
    }
  } catch (e) {
    toast.error(e.message);
    yield put(cancelAppointmentFetchFailure());
  }
}

function* cancelAppointmentSaga() {
  yield takeLatest(
    cancelAppointmentFetchRequest.type,
    getCancelAppointmentRequest,
  );
}

export default cancelAppointmentSaga;
