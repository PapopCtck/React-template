import commonConstant from '@/common/commonConstant';
import { createCookie, getCookie, deleteCookie } from '../Cookie/Cookie';

const createCookieToken = (value: string, hr?: number): string | null => createCookie(commonConstant.cookieToken, value, hr);
const getCookieToken = (): string | null | undefined => getCookie(commonConstant.cookieToken) ? getCookie(commonConstant.cookieToken) : null;
const deleteCookieToken = (): string | null => deleteCookie(commonConstant.cookieToken);

export {
  createCookieToken,
  getCookieToken,
  deleteCookieToken,
};
