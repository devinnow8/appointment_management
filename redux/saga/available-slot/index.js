import { call, put, takeLatest } from "redux-saga/effects";
import {
  availableSlotListFetchRequest,
  availableSlotListFetchSuccess,
  availableSlotListFetchFailure,
} from "../../reducer/available-slot";
import * as services from "../../../services";

function* getAvailableSlotListRequest(action) {
  try {
    const response = yield call(
      services.getAvailableSlotList,
      action.payload.requestBody,
    );
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(availableSlotListFetchSuccess(data));
    } else {
      yield put(availableSlotListFetchFailure());
    }
  } catch (e) {
    yield put(availableSlotListFetchFailure());
  }
}

function* availableSlotListSaga() {
  yield takeLatest(
    availableSlotListFetchRequest.type,
    getAvailableSlotListRequest,
  );
}

export default availableSlotListSaga;
