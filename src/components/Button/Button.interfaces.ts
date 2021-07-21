import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IStyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'primary' | 'secondary' | 'link' | 'warning' | 'danger',
  size?: 'small' | 'medium' | 'large',
  backgroundColor? : string,
  type?: 'button' | 'submit' | 'reset',
  block?: boolean,
}

export interface IButton extends IStyledButtonProps {
  label?: string,
  children?: ReactNode,
  className?: string,
}
