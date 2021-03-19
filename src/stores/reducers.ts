import { combineReducers } from 'redux';
import { Action, Types } from './interfaces';

import Type from './types';

function checkAction(state: Record<string,unknown>, action: Action, type: Types) {
  switch (action.type) {
    case type.SUCCESS:
    case type.FAILURE:
    case type.PENDING:
      return Object.assign({}, state, { ...action });
    default:
      return state;
  }
}

const getData = (state = {}, action: Action) => checkAction(state, action, Type.GET_DATA_ASYNC);
const getMemoByLine = (state = {}, action: Action) => checkAction(state, action, Type.GET_MEMO_LINEID);
const getUserByLine = (state = {},action: Action) => checkAction(state,action,Type.GET_LINE_PROFILE);

const profile = (state = {}, action: Action) => checkAction(state, action, Type.SET_PROFILE);

const rootReducer = combineReducers({
  getData,
  getMemoByLine,
  getUserByLine,
  profile,
});


export default rootReducer;
