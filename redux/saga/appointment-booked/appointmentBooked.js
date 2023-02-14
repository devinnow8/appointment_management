import { call, put } from "redux-saga/effects";
import {
  appointmentBookedPdfFetchSuccess,
  appointmentBookedPdfFetchFailure,
  appointmentBookedChecklistFetchSuccess,
  appointmentBookedChecklistFetchFailure,
  appointmentBookedDetailsFetchSuccess,
  appointmentBookedDetailsFetchFailure,
} from "../../reducer/appointment-booked";
import * as services from "../../../services";

export function* appointmentBookedPdfRequest(action) {
  const id = action.payload.id;
  try {
    const response = yield call(services.appointmentBookedPdf, id);
    action.payload.success(response);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(appointmentBookedPdfFetchSuccess(data));
    } else {
      yield put(appointmentBookedPdfFetchFailure());
    }
  } catch (e) {
    yield put(appointmentBookedPdfFetchFailure());
  }
}

export function* appointmentBookedChecklistRequest(action) {
  try {
    const response = yield call(
      services.appointmentBookedChecklist,
      action.payload.details,
    );
    action.payload.success(response);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(appointmentBookedChecklistFetchSuccess(data));
    } else {
      yield put(appointmentBookedChecklistFetchFailure());
    }
  } catch (e) {
    yield put(appointmentBookedChecklistFetchFailure());
  }
}

export function* appointmentBookedDetailsRequest(action) {
  const id = action.payload.id;
  try {
    const response = yield call(services.appointmentBookedDetails, id);
    action.payload.success(response);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(appointmentBookedDetailsFetchSuccess(data));
    } else {
      yield put(appointmentBookedDetailsFetchFailure());
    }
  } catch (e) {
    action.payload.error(e);
    yield put(appointmentBookedDetailsFetchFailure());
  }
}
