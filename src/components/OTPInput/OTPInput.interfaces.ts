import { KeyboardEventHandler, FormEventHandler, ClipboardEventHandler, ReactNode } from 'react';

export interface IInput {
  otpValues: Array<number>,
  index: number, 
  focus: boolean,
  blur: boolean,
  count: number,
  loading?: boolean, 
  handleOnFocus: (index: number) => () => void,
  handleOnKeyDown: KeyboardEventHandler,
  handleOnChange: FormEventHandler<HTMLInputElement>, 
  handleOnPaste: ClipboardEventHandler,
}

export interface IOTPInputValue {
  id?: string,
  value?: string, 
  isFilled: boolean
}

export interface IOTPInput {
  onChange?: (otpValue: string, { id,value, isFilled }: IOTPInputValue) => void,
  count: number,
  invalid?: boolean,
  id?: string,
  onLastInput?: (otpValue: string, { id,value, isFilled }: IOTPInputValue) => void,
  loading?: boolean,
  resendBtn?: boolean,
  resendFn?: () => void,
  delay?: boolean,
  resendDelay?: number,
  invalidMessage?: ReactNode,
  disabled?: boolean, 
}

export interface IisFocusingCurrentTarget {
  relatedTarget: HTMLElement, 
  currentTarget: HTMLElement,
}
