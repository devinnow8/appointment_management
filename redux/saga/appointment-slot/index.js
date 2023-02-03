import { call, put, takeLatest } from "redux-saga/effects";
import {
  appointmentSlotListFetchRequest,
  appointmentSlotListFetchSuccess,
} from "../../reducer/appointment-slot";
import * as services from "../../../services";

function* getAppointmentSlotListRequest(action) {
  try {
    const response = yield call(
      services.getAppointmentSlotList,
      action.payload.requestBody,
    );
    action.payload.successCallback(response);
    console.log(response, 'responseresponse');
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(appointmentSlotListFetchSuccess(data));
    } else {
    }
  } catch (e) {}
}

function* appointmentSlotListSaga() {
  yield takeLatest(
    appointmentSlotListFetchRequest.type,
    getAppointmentSlotListRequest,
  );
}

export default appointmentSlotListSaga;
