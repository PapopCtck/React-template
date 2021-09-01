import { Action } from './interfaces';
import Type from './types';


export const fetchGetData = (): Action => ({
  type: Type.GET_DATA_ASYNC.START,
  payload: {
    resTypes: Type.GET_DATA_ASYNC,
    url: 'https://reqres.in/api/users',
    data: { page: 2 },
    method: 'GET',
  },
});

export const saveData = (): Action => ({
  type: Type.SAVE_DATA,
  payload: {
    data: 'hello redux',
  },
});

//example for UnPromise usage
// export const setProfile = (profile: UnPromise<ReturnType<typeof liff.getProfile>>): Action => ({
//   type: Type.SAVE_DATA,
//   payload: {
//     data: profile,
//   },
// });

export default {
  fetchGetData,
  saveData,
};
