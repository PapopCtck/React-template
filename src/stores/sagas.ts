import { SagaMiddleware } from '@redux-saga/core';
import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { api,save } from './utils';
import Type from './types';

//please read the docs https://redux-saga.js.org/

//watchers
export function* getDataSaga(): Generator {
  yield all([
    takeLatest(Type.DATA_API, api),
    takeLatest(Type.GET_LINE_PROFILE.START,api),
  ]);
}

export function* saveDataSaga(): Generator {
  yield all([
    takeEvery(Type.SAVE_DATA, save),
  ]);
}

const sagas = [
  getDataSaga,
  saveDataSaga,
];

export const initSagas = (sagaMiddleware: SagaMiddleware): void =>
  sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));
