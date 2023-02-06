import { call, put, takeLatest } from "redux-saga/effects";
import {
  rescheduleAppointmentFetchRequest,
  rescheduleAppointmentFetchSuccess,
  rescheduleAppointmentFetchFailure,
} from "../../reducer/reschedule-appointment";
import * as services from "../../../services";
import { toast } from "react-toastify";

function* getRescheduleAppointmentRequest(action) {
  try {
    const response = yield call(
      services.rescheduldeAppointment,
      action.payload.requestBody,
    );
    const { status, statusText, data = [] } = response || {};
    console.log(status, response, "responseresponseresponse");
    if (status === 201) {
      yield put(rescheduleAppointmentFetchSuccess(data));
      action.payload.successCalback(response);
    } else {
      yield put(rescheduleAppointmentFetchFailure());
    }
  } catch (e) {
    console.log(e, "eeeeeeee");
    toast.error(e.message);
    yield put(rescheduleAppointmentFetchFailure());
  }
}

function* rescheduleAppointmentSaga() {
  yield takeLatest(
    rescheduleAppointmentFetchRequest.type,
    getRescheduleAppointmentRequest,
  );
}

export default rescheduleAppointmentSaga;
