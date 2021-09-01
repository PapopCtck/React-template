import { SagaMiddleware } from '@redux-saga/core';
import { all, takeLatest } from 'redux-saga/effects';

import { api } from './utils';
import Type from './types';

//please read the docs at https://redux-saga.js.org/

//watchers
export function* getDataSaga(): Generator {
  yield all([
    takeLatest(Type.GET_DATA_ASYNC.START,api),
  ]);
}

const sagas = [
  getDataSaga,
];

export const initSagas = (sagaMiddleware: SagaMiddleware): void =>
  sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));
