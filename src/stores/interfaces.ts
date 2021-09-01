/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Types extends Record<string,string> {
    START: string,
    SUCCESS: string,
    FAILURE: string,
}

//see https://redux.js.org/style-guide/style-guide#write-actions-using-the-flux-standard-action-convention
export interface Action {
  type: string,
  payload?: {
    resTypes?: Types,
    url?: string,
    data?: any,
    method?: string,
    isToken?: boolean,
    upload?: boolean,
    isLogin?: boolean,
  },
  error?: boolean,
}

export type State = any;

export type ReducerFunction = (state: State, action: Action) => State;
