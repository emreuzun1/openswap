import { getAllSaleService } from "@/services/sales";
import { call, put, fork, all, takeEvery } from "redux-saga/effects";
import { getAllSales, getAllSalesSuccess } from "./saleReducer";

function* getAllSalesSaga() {
  try {
    const res = yield call(getAllSaleService);
    if (res.status === 200) {
      yield put(getAllSalesSuccess(res.data));
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchGetAllSalesSaga() {
  yield takeEvery(getAllSales.type, getAllSalesSaga);
}

export default function* saga() {
  yield all([fork(watchGetAllSalesSaga)]);
}
