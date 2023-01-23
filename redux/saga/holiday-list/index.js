import { call, put, takeLatest } from 'redux-saga/effects';
import {
    holidayListFetchRequest,
    holidayListFetchSuccess
} from '../../reducer/holiday-list';
import * as services from '../../../services';

function* getHolidayListRequest(action) {
  try {
    const response = yield call(services.getHolidayList,action.payload.requestBody);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(holidayListFetchSuccess(data));
    } else {
    }
  } catch (e) {
  }
}

function* holidayListSaga() {
  yield takeLatest(holidayListFetchRequest.type, getHolidayListRequest);
}

export default holidayListSaga;
