import { call, put, takeLatest } from "redux-saga/effects";
import {
  centerListFetchRequest,
  centerListFetchSuccess,
  centerListFetchFailure,
} from "../../reducer/center-list";
import * as services from "../../../services";
import { toast } from "react-toastify";

function* getCenterListRequest() {
  try {
    const response = yield call(services.getCenterList);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(centerListFetchSuccess(data));
    } else {
      yield put(centerListFetchFailure());
    }
  } catch (e) {
    yield put(centerListFetchFailure());
    toast.error("Centres Network Error");
  }
}

function* centerListSaga() {
  yield takeLatest(centerListFetchRequest.type, getCenterListRequest);
}

export default centerListSaga;
