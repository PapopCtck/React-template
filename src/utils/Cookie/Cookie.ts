import commonConstant from '../../common/commonConstant';
import { validateHTTPS, validateHaveCookieName, history } from '..';

export const createCookie = (name: string, value: string, hr?: number): string | null => {
  try {
    if (name && value) {
      const dt = new Date();
      if (hr) {
        dt.setTime(dt.getTime() + (3600000 * hr));
      } else {
        dt.setTime(dt.getTime() + 3600000);
      }
      return document.cookie = `${name}=${value}; expires=${hr ? dt.toUTCString() : ''}; domain=${commonConstant.envCookie ? commonConstant.envCookie : ''}; path=/${validateHTTPS(window.location.href) ? '; secure' : ''}`;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getCookie = (name: string): string| undefined | null => {
  try {
    if (name) {
      const parts = `; ${document.cookie}`.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts?.pop()?.split(';').shift();
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const deleteCookie = (name: string): string | null => {
  try {
    if (name) {
      if (validateHaveCookieName(name)) {
        return document.cookie = `${name}=; expires=${new Date(new Date().setDate(new Date().getDate() - 1)).toUTCString()}; domain=${commonConstant.envCookie ? commonConstant.envCookie : ''}; path=/${validateHTTPS(window.location.href) ? '; secure' : ''}`;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getCookieAll = (): Array<Record<string,string>> | null => {
  try {
    const cookie = document.cookie.split(';');
    const arr: Array<Record<string,string>> = [];

    cookie.forEach(ele => {
      const data = ele.split('=');
      arr.push({
        key: data[0],
        value: data[1],
      });
    });
    return arr;
  } catch (error) {
    return null;
  }
};

export const setCookieAll = (data: Array<Record<string,string>>): void | null => {
  try {
    data.forEach(data => createCookie(data.key, data.value));
    return history.push(commonConstant.pathLogin);
  } catch (error) {
    return null;
  }
};
