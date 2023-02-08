import { call, put } from 'redux-saga/effects';
import {
    appointmentBookedPdfFetchSuccess,
    appointmentBookedPdfFetchFailure,
} from '../../reducer/appointment-booked';
import * as services from '../../../services';

export function* appointmentBookedPdfRequest(action) {
  const id = action.payload.id;
    console.log(action, 'actionaction');
  try {
    const response = yield call(services.appointmentBookedPdf, id);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(appointmentBookedPdfFetchSuccess(data));
    } else {
      yield put(appointmentBookedPdfFetchFailure());
    }
  } catch (e) {
    yield put(appointmentBookedPdfFetchFailure());
  }
}




