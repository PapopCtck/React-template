import liff from '@line/liff';

import { Action } from './interfaces';
import Type from './types';
import commonConstant from '@/common/commonConstant';
import { UnPromise } from '@/common/commonInterfaces';


export const fetchGetData = (): Action => ({
  type: Type.DATA_API,
  resTypes: Type.GET_DATA_ASYNC,
  url: 'https://reqres.in/api/users',
  data: { page: 2 },
  method: 'GET',
});

export const fetchGetUserByLine = (lineId: string): Action => ({
  type: Type.GET_LINE_PROFILE.START,
  resTypes: Type.GET_LINE_PROFILE,
  url: `${commonConstant.envDomainApi}/api/users/line/${lineId}`,
  method: 'GET',
});

export const setProfile = (profile: UnPromise<ReturnType<typeof liff.getProfile>>): Action => ({
  type: Type.SAVE_DATA,
  resTypes: Type.SET_PROFILE,
  data: profile,
});



export default {
  fetchGetData,
  fetchGetUserByLine,
  setProfile,
};
