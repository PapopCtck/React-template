import { HTMLAttributes, FormEventHandler } from 'react';

interface IFormClassname {
  className?: string[],
}
export interface IFormBase extends Omit<HTMLAttributes<HTMLFormElement>,keyof IFormClassname> {
  handlesubmit?: FormEventHandler,
  customValidate?: boolean,
  beforeValidate?: () => void,
}

export type IForm = IFormBase & IFormClassname;
