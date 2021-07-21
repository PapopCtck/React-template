import { HTMLAttributes } from 'react';

export interface ISkeleton extends HTMLAttributes<HTMLDivElement> {
  type?: 'circle' | 'rectangle',
  loading?: boolean,
  dark?: boolean,
  width?: string,
  height?: string,
  duration?: number,
  delay?: number,
}
