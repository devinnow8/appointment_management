import { takeLatest } from 'redux-saga/effects';
import {
    appointmentBookedPdfRequest
} from '../../reducer/appointment-booked';
import * as appointmentBookedCrudSaga from './appointmentBooked';

function* appointmentBookedSaga() {
  yield takeLatest(
    appointmentBookedPdfRequest.type,
    appointmentBookedCrudSaga.appointmentBookedPdfRequest
  );
}

export default appointmentBookedSaga;
