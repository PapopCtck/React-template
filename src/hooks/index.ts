import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import liff from '@line/liff';

import { setProfile } from '../stores/actions';
import commonConstant from '../common/commonConstant';

export function useLineLiff(): void {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (commonConstant.liffId) {
      liff.init({ liffId: commonConstant.liffId }, () => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        liff.getProfile()
          .then(profile => {
            dispatch(setProfile(profile));
          });
      }, () => {
        alert('Something went wrong, Please try again later');
      });
    }
  }, []);
}
