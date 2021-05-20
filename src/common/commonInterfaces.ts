export type UnPromise<T> = T extends Promise<infer X>? X : T;

export interface ReduxData<T>{
  status?: number | null,
  type: string,
  data?: T | null,
}
