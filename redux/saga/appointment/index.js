import { call, put, takeLatest } from 'redux-saga/effects';
import {
    appointmentScheduleFetchRequest,
    appointmentScheduleFetchSuccess
} from '../../reducer/appointment';
import * as services from '../../../services';

function* getAppointmentScheduleRequest(action) {
  try {
    const response = yield call(services.appointmentSchedule,action.payload.requestBody);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(appointmentScheduleFetchSuccess(data));
    } else {
    }
  } catch (e) {
  }
}

function* appointmentSaga() {
  yield takeLatest(appointmentScheduleFetchRequest.type, getAppointmentScheduleRequest);
}

export default appointmentSaga;