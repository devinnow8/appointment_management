import { takeLatest } from "redux-saga/effects";
import {
  appointmentOrderRequest,
  confirmOrderRequest,
} from "../../reducer/order-conformation";
import * as orderControllerDetailsSaga from "./orderController";

function* orderControllerSaga() {
  yield takeLatest(
    appointmentOrderRequest.type,
    orderControllerDetailsSaga.appointmentOrderRequest,
  );
  yield takeLatest(
    confirmOrderRequest.type,
    orderControllerDetailsSaga.confirmOrderRequest,
  );
}

export default orderControllerSaga;
