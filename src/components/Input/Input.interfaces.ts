import { ReactNode, ChangeEventHandler, FocusEventHandler } from 'react';

export interface Block {
  block?: boolean,
}

export interface IInputWithLength extends Block {
  label?: string,
  className?: string,
  prefix?: ReactNode,
  suffix?: ReactNode,
  maxLength?: number,
  errorMessage?: string,
  value?: string | readonly string[],
  customValidate?: boolean,
  customValidateMessage?: string,
  required?: boolean,
  placeholder?: string,
  onChange?: ChangeEventHandler,
  onBlur?: FocusEventHandler,
}

export interface IStyledInput extends Block {
  pref?: boolean,
  suff?: boolean,
}
