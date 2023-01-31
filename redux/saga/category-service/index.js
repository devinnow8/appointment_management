import { call, put, takeLatest } from "redux-saga/effects";
import {
  categoryServiceListFetchRequest,
  categoryServiceListFetchSuccess,
} from "../../reducer/category-service";
import * as services from "../../../services";

function* getCategoryServiceListRequest() {
  try {
    const response = yield call(services.getCategoryServiceList);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(categoryServiceListFetchSuccess(data));
    } else {
    }
  } catch (e) {}
}

function* categoryServiceListSaga() {
  yield takeLatest(
    categoryServiceListFetchRequest.type,
    getCategoryServiceListRequest,
  );
}

export default categoryServiceListSaga;
