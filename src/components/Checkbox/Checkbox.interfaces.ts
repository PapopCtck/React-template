import { MouseEventHandler, ReactNode } from 'react';

export interface IStyledCheckbox {
  borderColor?: string
}

export interface ICheckbox {
  label?: ReactNode, 
  checked?: boolean, 
  className?: string,
  containerClassname?: string, 
  checkmarkColor?: string, 
  borderColor?: string,
  onClick?: MouseEventHandler,
  type?: 'circle' | 'box',
  id?: string,
  readOnly?: boolean,
}
