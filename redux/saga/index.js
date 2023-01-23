import { all } from 'redux-saga/effects';
import centerListSaga from './center-list';
import holidayListSaga from './holiday-list';

const rootSaga = function* root() {
  yield all([centerListSaga(), holidayListSaga()]);
};
export default rootSaga;
