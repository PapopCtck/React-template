import { CSSProperties, HTMLAttributes, Key, ReactNode } from 'react';

export interface IAlert {
  className?: string,
  type?: 'success' | 'danger' | 'warning',
  closable?: boolean,
  show?: boolean,
  onCloseClick?: () => void,
  children?: ReactNode,
  styleCloseBtn?: CSSProperties,
  styleBanner?: CSSProperties,
  duration?: number,
  absolute?: boolean,
  key?: Key | null,
  standalone?: boolean,
}

export interface IStyledAlert {
  show: boolean,
  absolute: boolean,
  standalone: boolean,
}

export interface IReduxAlerts extends HTMLAttributes<HTMLDivElement> {
  stateName?: string,
}
