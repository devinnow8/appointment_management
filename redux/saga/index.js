import { all } from 'redux-saga/effects';
import centerListSaga from './center-list';
import holidayListSaga from './holiday-list';
import appointmentSaga from './appointment';

const rootSaga = function* root() {
  yield all([centerListSaga(), holidayListSaga(),appointmentSaga()]);
};
export default rootSaga;
