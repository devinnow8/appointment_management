import { call, put, takeLatest } from "redux-saga/effects";
import {
  applicationDetailsFetchRequest,
  applicationDetailsFetchSuccess,
  applicationDetailsFetchMemberSuccess,
  applicationDetailsFetchFailure,
} from "../../reducer/application-detail";
import * as services from "../../../services";
import { toast } from "react-toastify";

function* getApplicationDetailsRequest(action) {
  try {
    const response = yield call(
      services.applicationDetails,
      action.payload.requestBody,
    );
    const { status, statusText, data } = response || {};

    if (status === 200) {
      if (data.category !== action.payload.requestBody.serviceType) {
        yield put(applicationDetailsFetchFailure());
        toast.error("Application not found");
      } else {
        yield put(applicationDetailsFetchSuccess(data));
        const tempArray = [];
        tempArray.push(data);
        yield put(applicationDetailsFetchMemberSuccess(tempArray));
        action.payload.successCallback(true);
      }
    } else {
      yield put(applicationDetailsFetchFailure());
    }
  } catch (e) {
    yield put(applicationDetailsFetchFailure());
    if (e.message.includes("Network Error")) {
      toast.error(error.message);
    } else {
      toast.error("Application not found");
    }
  }
}

function* applicationDetailsSaga() {
  yield takeLatest(
    applicationDetailsFetchRequest.type,
    getApplicationDetailsRequest,
  );
}

export default applicationDetailsSaga;
