import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from '@redux-saga/core';

import reducer from "./reducers";
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({ 
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(saga);

export default store