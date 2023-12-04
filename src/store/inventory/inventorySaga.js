import { call, put, fork, all, takeEvery } from "redux-saga/effects";
import {
  createItem,
  getInventory,
  getInventorySuccess,
} from "./inventorySlice";
import { getInventoryService } from "@/services/alchemy";
import { postSaleService } from "@/services/sales";

function* getInventorySaga(action) {
  if (action.payload) {
    const account = action.payload;
    try {
      const res = yield call(getInventoryService, account);
      if (res) {
        yield put(getInventorySuccess(res));
      }
    } catch (err) {
      console.log(err);
    }
  }
}

function* watchGetInventorySaga() {
  yield takeEvery(getInventory.type, getInventorySaga);
}

function* createItemSaga(action) {
  if (action.payload) {
    try {
      const item = action.payload;
      const res = yield call(postSaleService, item);
    } catch (err) {
      console.log(err);
    }
  }
}

function* watchCreateItemSaga() {
  yield takeEvery(createItem.type, createItemSaga);
}

export default function* saga() {
  yield all([fork(watchGetInventorySaga), fork(watchCreateItemSaga)]);
}
