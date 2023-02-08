import { call, put, takeLatest } from "redux-saga/effects";
import {
  applicationDetailsFetchRequest,
  applicationDetailsFetchFailure,
} from "../../reducer/application-detail";
import * as services from "../../../services";

function* getApplicationDetailsRequest(action) {
  try {
    const response = yield call(
      services.applicationDetails,
      action.payload.requestBody,
    );
    action.payload.successCalback(response);
  } catch (e) {
    // yield put(applicationDetailsFetchFailure());
    action.payload.errorCallback(e);
  }
}

function* applicationDetailsSaga() {
  yield takeLatest(
    applicationDetailsFetchRequest.type,
    getApplicationDetailsRequest,
  );
}

export default applicationDetailsSaga;
