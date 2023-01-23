import { call, put, takeLatest } from 'redux-saga/effects';
import {
    centerListFetchRequest,
    centerListFetchSuccess
} from '../../reducer/center-list';
import * as services from '../../../services';

function* getCenterListRequest() {
  try {
    const response = yield call(services.getCenterList);
    console.log(response, 'responseresponse');
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(centerListFetchSuccess(data));
    } else {
    }
  } catch (e) {
  }
}

function* centerListSaga() {
  yield takeLatest(centerListFetchRequest.type, getCenterListRequest);
}

export default centerListSaga;
