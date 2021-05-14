/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Types extends Record<string,string> {
    START: string,
    PENDING: string,
    SUCCESS: string,
    FAILURE: string,
}

export interface Action {
  type: string,
  resTypes?: Types,
  url?: string,
  data?: any,
  method?: string,
  isToken?: boolean,
  upload?: boolean,
  isLogin?: boolean,
}
