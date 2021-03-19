export const validateHTTPS = (url: string): boolean => {
  try {
    return url ? new RegExp('https://').test(url.toLocaleLowerCase()) : false;
  } catch (error) {
    return false;
  }
};

export const validateHaveCookieName = (name: string): boolean => {
  try {
    return name ? new RegExp(`${name}=`).test(document.cookie) : false;
  } catch (error) {
    return false;
  }
};
