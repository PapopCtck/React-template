import { put } from 'redux-saga/effects';

import { getCookieToken } from '../common';
import { Action, Types } from './interfaces';

const asyncTypes = {
  START: 'START',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const createAsyncTypes = (typeString: string): Types =>
  Object.values(asyncTypes).reduce((acc, curr) => {
    acc[curr] = `${typeString}_${curr}`;
    return acc;
  },<Types>{});

function* checkStatus(resTypes: Types| undefined, res: Response): unknown {
  try {
    const data = yield res.json();
    if (res.status === 200 || res.status === 201) {
      return yield put({ type: resTypes?.SUCCESS, data, status: res.status });
    } else if (res.status === 401) {
      window.location.href = '/login';
    } else if (res.status === 500 || res.status === 502) {
      window.location.href = '/warning';
    }
    return yield put({
      type: resTypes?.FAILURE,
      data: null,
      status: res.status ? res.status : res,
    });
  } catch (error) {
    yield put({
      type: resTypes?.SUCCESS,
      data: null,
      status: 204,
    });
  }
}
  
function* error(resTypes: Types| undefined) {
  yield put({
    type: resTypes?.FAILURE,
    data: null,
    status: 500,
  });
}
  
export function* api({ resTypes, method = '', url, isToken, data }: Action): unknown {
  try {
    yield put({
      type: resTypes?.PENDING,
      data: null,
    });
    const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
    const paramsFormat = dataOrParams === 'params' ? new URLSearchParams(Object.entries(data)).toString() : '';
    const headers = yield new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    if (isToken) { yield headers.append('Authorization', getCookieToken()); }
    const res = yield fetch(`${`${url}?${paramsFormat}`}`, {
      method,
      headers,
    });
    yield checkStatus(resTypes, res);
  } catch (err) {
    alert(err);
    yield error(resTypes);
  }
}
export function* save({ resTypes, data }: Action): Generator {
  try {
    yield put({
      type: resTypes?.SUCCESS,
      data,
    });
  } catch {
    yield put({
      type: resTypes?.FAILURE,
      data: null,
    });
  }
}
  
