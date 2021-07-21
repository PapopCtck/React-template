import { CSSProperties, MouseEventHandler } from 'react';

export interface IAvatar {
  borderRadius?: string,
  src?: string,
  srcset?: string,
  name: string,
  color?: string,
  colors?: Array<string>,
  size: string,
  style?: CSSProperties,
  className?: string,
  loading?: boolean,
  onClick?: MouseEventHandler,
}

export interface IStoryAvatarContainer {
  borderColor?: string,
}

export interface IStoryAvatar extends IAvatar {
  borderColor?: string,
  loading?: boolean,
}

export interface IStoryAvatarContainer {
  borderColor?: string,
}

export interface IStoryAvatar extends IAvatar {
  borderColor?: string,
}
