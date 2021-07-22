import { ReactNode } from 'react';
import { HTMLMotionProps } from 'framer-motion';

export interface IModal extends HTMLMotionProps<'div'> {
  children?: ReactNode,
  show?: boolean, 
  onBackgroundClick? : () => void,
  fullscreen?: 'all' | 'mobile' | 'tablet' | 'none',
  maxWidth?: string, 
}
