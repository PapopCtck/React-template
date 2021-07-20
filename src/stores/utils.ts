import { put, delay, call } from 'redux-saga/effects';

import { createCookieToken, deleteCookieToken, getCookieToken } from '@/utils';
import commonConstant from '@/common/commonConstant';
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
  }, <Types>{});

function* fetchRefreshToken(): unknown {
  const token = getCookieToken();
  try {
    const headers = yield new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    yield headers.append('Authorization', token);
    const res = yield fetch(`${commonConstant.envDomainApi}/api/users/refresh-token`, {
      method: 'POST',
      body: JSON.stringify({ ttl: 21600 }),
      headers,
    });
    if (res.status === 200 && token) {
      return createCookieToken(token);
    } else if (res.status === 401) {
      deleteCookieToken();
      return window.location.href = commonConstant.pathLogin;
    } else if (res.status === 500 || res.status === 502) {
      return window.location.href = commonConstant.pathError500;
    }
    return;
  } catch (err) {
    return;
  }
}
  

function* checkStatus(resTypes: Types | undefined, res: Response, isToken?: boolean, isLogin?: boolean): unknown {
  try {
    const data = yield res.json();
    if (res.status === 200 || res.status === 201) {
      // if (resTypes?.SUCCESS === Type.USER_LOGOUT.SUCCESS) {
      //   yield deleteCookieToken();
      // } // case there is api for logout
      if (isLogin) {createCookieToken(data.accessToken, 24); }
      else if (isToken) {yield fetchRefreshToken(); }
      return yield put({ type: resTypes?.SUCCESS, data, status: res.status });
    } else if (res.status === 401) {
      deleteCookieToken();
      window.location.href = commonConstant.pathLogin;
    } else if (res.status === 500 || res.status === 502) {
      window.location.href = commonConstant.pathError500;
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

function* error(resTypes: Types | undefined) {
  yield put({
    type: resTypes?.FAILURE,
    data: null,
    status: 500,
  });
}

export function* api({ resTypes, method = '', url, isToken = false, data, upload = false, isLogin = false }: Action): unknown {
  try {
    yield put({
      type: resTypes?.PENDING,
      data: null,
    });
    const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
    const paramsFormat = dataOrParams === 'params' ? `?${new URLSearchParams(Object.entries(data)).toString()}` : '';
    const headers = yield new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    if (isToken) { yield headers.append('Authorization', getCookieToken()); }
    const res = yield fetch(`${`${url}${paramsFormat}`}`, {
      method,
      body: dataOrParams === 'data' ? (upload ? data : JSON.stringify(data)) : null,
      headers,
    });
    yield checkStatus(resTypes, res, isToken, isLogin);
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

export function* logout({ resTypes, data }: Action): Generator {
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

export function* delayedApiCall(args: Action): Generator {
  yield delay(500);
  yield call(api,args);
}
