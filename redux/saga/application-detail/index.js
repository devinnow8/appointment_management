import { call, put, takeLatest } from "redux-saga/effects";
import { applicationDetailsFetchRequest } from "../../reducer/application-detail";
import * as services from "../../../services";

function* getApplicationDetailsRequest(action) {
  try {
    const response = yield call(
      services.applicationDetails,
      action.payload.requestBody,
    );
    action.payload.successCalback(response);
  } catch (e) {}
}

function* applicationDetailsSaga() {
  yield takeLatest(
    applicationDetailsFetchRequest.type,
    getApplicationDetailsRequest,
  );
}

export default applicationDetailsSaga;
