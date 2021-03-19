import { createAsyncTypes } from './utils';

const SAVE_DATA = 'SAVE_DATA';
const DATA_API = 'DATA_API';

//Using ASYNC as a convention to know that I'll have three types.
const GET_DATA_ASYNC = createAsyncTypes('GET_DATA');
const POST_DATA_ASYNC = createAsyncTypes('POST_DATA');
const GET_MEMO_LINEID = createAsyncTypes('GET_MEMO_LINEID');
const SET_PROFILE = createAsyncTypes('SET_PROFILE');
const GET_LINE_PROFILE = createAsyncTypes('GET_LINE_PROFILE');

export default {
  SAVE_DATA,
  DATA_API,
  GET_DATA_ASYNC,
  POST_DATA_ASYNC,
  GET_MEMO_LINEID,
  SET_PROFILE,
  GET_LINE_PROFILE,
};
