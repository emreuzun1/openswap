import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleWare from "redux-saga";
import rootSaga, { rootReducers } from "./sagas";
import { createWrapper } from "next-redux-wrapper";

const sagaMiddleware = createSagaMiddleWare();

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducers,
    middleware: (gDM) => gDM().concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
