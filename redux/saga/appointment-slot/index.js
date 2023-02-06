import { call, put, takeLatest } from "redux-saga/effects";
import {
  appointmentSlotListFetchRequest,
  appointmentSlotListFetchSuccess,
  appointmentSlotListFetchFailure,
} from "../../reducer/appointment-slot";
import * as services from "../../../services";

function* getAppointmentSlotListRequest(action) {
  try {
    const response = yield call(
      services.getAppointmentSlotList,
      action.payload.requestBody,
    );
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(appointmentSlotListFetchSuccess(data));
    } else {
      yield put(appointmentSlotListFetchFailure());
    }
  } catch (e) {
    yield put(appointmentSlotListFetchFailure());
  }
}

function* appointmentSlotListSaga() {
  yield takeLatest(
    appointmentSlotListFetchRequest.type,
    getAppointmentSlotListRequest,
  );
}

export default appointmentSlotListSaga;
