import { createAsyncTypes } from './utils';

//see https://redux.js.org/style-guide/style-guide#write-meaningful-action-names

//bad example
const SAVE_DATA = 'SAVE_DATA';

//good example
const LOGOUT = 'LOGOUT';
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const EDIT_TODO = 'EDIT_TODO';

//Using ASYNC as a convention to know that I'll have three types.
const GET_DATA_ASYNC = createAsyncTypes('GET_DATA');

export default {
  //static
  SAVE_DATA,
  LOGOUT,
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  //async
  GET_DATA_ASYNC,
};
