import { connectWalletRequest, getConnectedWallet } from "@/services/metamask";
import { call, put, fork, all, takeEvery } from "redux-saga/effects";
import {
  connectWallet,
  connectWalletSuccess,
  loginWithWallet,
} from "./authSlice";

function* connectWalletSaga() {
  try {
    const res = yield call(getConnectedWallet);
    if (res.success) {
      yield put(connectWalletSuccess({ account: res.address }));
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchConnectWalletSaga() {
  yield takeEvery(connectWallet.type, connectWalletSaga);
}

function* loginWithWalletSaga() {
  try {
    const res = yield call(connectWalletRequest);
    if (res.success) {
      yield put(connectWalletSuccess({ account: res.address }));
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchLoginWithWalletSaga() {
  yield takeEvery(loginWithWallet.type, loginWithWalletSaga);
}

export default function* saga() {
  yield all([fork(watchConnectWalletSaga), fork(watchLoginWithWalletSaga)]);
}
