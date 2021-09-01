import { put, delay, call } from 'redux-saga/effects';

// import { createCookieToken, deleteCookieToken, getCookieToken } from '@/utils';
import commonConstant from '@/common/commonConstant';
import { Action, ReducerFunction, State, Types } from './interfaces';
import Type from './types';

const asyncTypes = {
  START: 'START',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const createAsyncTypes = (typeString: string): Types =>
  Object.values(asyncTypes).reduce((acc, curr) => {
    acc[curr] = `${typeString}_${curr}`;
    return acc;
  }, <Types>{});

function* fetchRefreshToken(): unknown {
  // const token = getCookieToken();
  try {
    const headers = yield new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    // yield headers.append('Authorization', token);
    const res = yield fetch(`${commonConstant.envDomainApi}/api/users/refresh-token`, {
      method: 'POST',
      body: JSON.stringify({ ttl: 21600 }),
      headers,
      credentials: 'include',
    });
    // if (res.status === 200 && token) {
    //   // return createCookieToken(token);
    // } else 
    if (res.status === 401) {
      // deleteCookieToken();
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
      // if (isLogin) {createCookieToken(data.accessToken, 24); } // case there is a need to set cookie when login
      // else 
      if (isToken) {yield fetchRefreshToken(); }
      return yield put({ 
        type: resTypes?.SUCCESS, 
        payload: {
          data, 
          status: res.status, 
        },
      });
    } else if (res.status === 401) {
      // deleteCookieToken();
      // yield put(logout());
      window.location.href = commonConstant.pathLogin;
    } else if (res.status === 500 || res.status === 502) {
      window.location.href = commonConstant.pathError500;
    }
    return yield put({
      type: resTypes?.FAILURE,
      payload: {
        data: null,
        status: res.status ? res.status : res,
      },
    });
  } catch (error) {
    yield put({
      type: resTypes?.FAILURE,
      payload: {
        data: null,
        status: 204,
      },
      error: true, 
    });
  }
}

function* error(resTypes: Types | undefined) {
  yield put({
    type: resTypes?.FAILURE,
    payload: {
      data: null,
      status: 500,
    },
    error: true, 
  });
}

export function* api({ payload }: Action): unknown {
  if (payload){
    const { resTypes, method = '', url, isToken = false, data, upload = false, isLogin = false } = payload;
    try {
      const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
      const paramsFormat = dataOrParams === 'params' ? `?${new URLSearchParams(Object.entries(data)).toString()}` : '';
      const headers = yield new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });
      // if (isToken) { yield headers.append('Authorization', getCookieToken()); }
      const res = yield fetch(`${`${url}${paramsFormat}`}`, {
        method,
        body: dataOrParams === 'data' ? (upload ? data : JSON.stringify(data)) : null,
        headers,
        credentials: isLogin || isToken ? 'include' : undefined,
      });
      yield checkStatus(resTypes, res, isToken, isLogin);
    } catch (err) {
      yield error(resTypes);
    }
  }
}

export function* logout(): Generator {
  yield put({
    type: Type.LOGOUT,
  });
}

export function* delayedApiCall(args: Action): Generator {
  yield delay(500);
  yield call(api,args);
}

export function updateObject(oldObject: Record<string,unknown>, newValues: Record<string,unknown>): Record<string,unknown> {
  return Object.assign({}, oldObject, newValues);
}

export function updateState(state: State,action: Action): Record<string,unknown> {
  return updateObject(state,{ type: action.type, ...action.payload });
}

export function updateItemInArray(array: Array<Record<string,unknown>>,identifier: string, id: string, updateItemCallback: (item: Record<string,unknown>) => Record<string,unknown>): Array<Record<string,unknown>> {
  const updatedItems = array.map(item => {
    if (item[identifier] !== id) {
      return item;
    }

    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
}

export function createReducer(initialState: State, handlers: Record<string, ReducerFunction>) {
  return function reducer(state = initialState, action: Action): State {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export function createAsyncHandlers(types: Types ,handleFunction: ReducerFunction): Record<string, ReducerFunction> {
  const { START, ...rest } = types;
  const obj = Object.values(rest).reduce((acc, curr) => {
    acc[curr] = handleFunction;
    return acc;
  },<Record<string, ReducerFunction>> {});
  obj[START] = (state:State,action: Action) => updateObject(state,{ type: action.type, data: {} });
  return obj;
}
