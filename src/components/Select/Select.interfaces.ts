import { Theme } from '@emotion/react';
import { ReactNode, ReactElement, CSSProperties } from 'react';

export interface ISStyledSelectContainer {
  block?: boolean,
}

export interface ISelectContainer {
  active?: boolean,
  disabled?: boolean,
}


export interface ICustomSelectData {
  target: {
    name?: string,
    value: string,
    id?: string,
  }
}

export interface ICustomSelectProps {
  value?: string,
  children?: ReactNode,
  placeholder?: string,
  onChange: ({ 'target': { name, value, id } }:ICustomSelectData) => void,
  name?: string,
  id?: string,
  disabled?: boolean,
  allKeyword?: string,
  showSelect?: boolean,
  customCarret?: ReactElement,
  theme?: Theme,
}

export interface ISelect extends ICustomSelectProps{
  children?: ReactNode,
  block?: boolean,
  containerClassname?: string,
  containerStyle?: CSSProperties,
}

export interface ICustomSelectState {
  showOptionList: boolean,
  defaultSelectText: ReactNode,
}
