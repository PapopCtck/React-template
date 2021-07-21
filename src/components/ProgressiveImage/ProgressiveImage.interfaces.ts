import { CSSProperties, MouseEventHandler } from 'react';

export interface IProgressiveImage {
  src?: string,
  alt?: string,
  className?: string,
  animationUrl?: string,
  srcSet?: string,
  thumbWidth?: number,
  style?: CSSProperties,
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down',
  onClick?: MouseEventHandler,
  widthPrefix?: string,
}

export interface FullImg {
  objectFit: string,
}
