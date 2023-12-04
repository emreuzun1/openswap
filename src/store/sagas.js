import { all } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import authSlice from "./auth/authSlice";
import saleSlice from "./sales/saleReducer";
import saleSaga from "./sales/saleSaga";
import inventorySlice from "./inventory/inventorySlice";
import inventorySaga from "./inventory/inventorySaga";

export const rootReducers = {
  auth: authSlice,
  sales: saleSlice,
  inventory: inventorySlice,
};

export default function* rootSaga() {
  yield all([authSaga(), saleSaga(), inventorySaga()]);
}
