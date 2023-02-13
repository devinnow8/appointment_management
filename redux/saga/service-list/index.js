import { call, put, takeLatest } from "redux-saga/effects";
import {
  serviceListFetchRequest,
  serviceListFetchSuccess,
  serviceListFetchFailure,
} from "../../reducer/service-list";
import * as services from "../../../services";
import { toast } from "react-toastify";

function* getServiceListRequest(action) {
  console.log(action, "actionaction/>>");
  try {
    const response = yield call(
      services.serviceList,
      action.payload.requestBody,
    );
    console.log(response, "responseresponse==>>");
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(serviceListFetchSuccess(data));
    } else {
      yield put(serviceListFetchFailure());
    }
  } catch (e) {
    toast.error(e.message);
    yield put(serviceListFetchFailure());
  }
}

function* serviceListSaga() {
  yield takeLatest(serviceListFetchRequest.type, getServiceListRequest);
}

export default serviceListSaga;
