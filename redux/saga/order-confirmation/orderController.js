import { call, put } from "redux-saga/effects";
import {
  appointmentOrderFetchSuccess,
  appointmentOrderFetchFailure,
  confirmOrderFetchSuccess,
  confirmOrderFetchFailure,
} from "../../reducer/order-conformation";
import * as services from "../../../services";

export function* appointmentOrderRequest(action) {
  try {
    const response = yield call(
      services.appointmentOrderRequest,
      action.payload.details,
    );
    action.payload.success(response);
    const { status, statusText, data = [] } = response || {};
    action.payload.success(response);
    if (status === 200) {
      yield put(appointmentOrderFetchSuccess(data));
    } else {
      yield put(appointmentOrderFetchFailure());
    }
  } catch (e) {
    yield put(appointmentOrderFetchFailure());
  }
}

export function* confirmOrderRequest(action) {
  try {
    const response = yield call(
      services.confirmOrderRequest,
      action.payload.details,
    );
    action.payload.success(response);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      yield put(confirmOrderFetchSuccess(data));
    } else {
      yield put(confirmOrderFetchFailure());
    }
  } catch (e) {
    yield put(confirmOrderFetchFailure());
  }
}
