import commonConstant from './commonConstant';
import { createCookie, getCookie, deleteCookie } from '../utils';

const createCookieToken = (value: string): string | null => createCookie(commonConstant.cookieToken, value);
const getCookieToken = (): string | null | undefined => getCookie(commonConstant.cookieToken) ? getCookie(commonConstant.cookieToken) : null;
const deleteCookieToken = (): string | null => deleteCookie(commonConstant.cookieToken);

export {
  createCookieToken,
  getCookieToken,
  deleteCookieToken,
};
