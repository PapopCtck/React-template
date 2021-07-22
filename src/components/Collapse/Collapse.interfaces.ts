import { ReactNode } from 'react';

export interface Standalone {
  standalone?: boolean,
}

export interface ICollapse extends Standalone {
  title: string,
  children?: ReactNode, 
  customSuffix?: ReactNode, 
  isCollapsed?: boolean, 
  onClick?: () => void, 
  seperator?: boolean, 
  noContent?: boolean, 
  containerClassName?: string
}

export interface ICollapseContent extends Standalone {
  active?: boolean,
}
