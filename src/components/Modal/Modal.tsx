import { ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { HTMLMotionProps, motion } from 'framer-motion';

import { Card } from '../Card/Card';
export interface IModalProps extends HTMLMotionProps<'div'> {
  children?: ReactNode,
  show?: boolean, 
  onBackgroundClick? : () => void,
  fullscreen?: 'all' | 'mobile' | 'tablet' | 'none',
  maxWidth?: string, 
}

export const StyledModal = styled(motion.div)<IModalProps>(
  props => css`
  position: fixed;
  left: 0;
  top: 0;
  width:100%;
  height: 100%;
  z-index: 9999;
  justify-content: center;
  align-items: center;
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${props.theme.modalBackgroundColor};
  }
  .modal-card {
    z-index: 10000;
    overflow-y: auto;
    position: relative;
  }
`, props => {
    switch (props.fullscreen) {
      case 'mobile':
        return css`
        .modal-card{
          height: 100%;
          width: 100%;
          @media only screen and (min-width: 768px){
            height: auto;
            width: auto;
            max-width: ${props.maxWidth};
          }
        }
      `;
      case 'tablet':
        return css`
        .modal-card{
          height: 100%;
          width: 100%;
          @media only screen and (min-width: 1024px){
            height: auto;
            width: auto;
            max-width: ${props.maxWidth};
          }
        }
      `;
      case 'all':
        return css`
        .modal-card{
          height: 100%;
          width: 100%;
        }
      `;
      default:
        return css`
        .modal-card{
          height: auto;
          width: auto;
          max-width: ${props.maxWidth};
        }
      `;
    }},
);

export const Modal = ({ children,show, onBackgroundClick,...rest }: IModalProps): ReactElement => (
  <StyledModal show={show} 
    style={{ display: 'none' }}
    animate={
      show ? {
        opacity: 1,
        display: 'flex',
      } : {
        opacity: 0,
        transitionEnd: { display: 'none' },
      }
    }
    transition={{
      duration: 0.3,
    }}
    {...rest}
  >
    <div className="modal-background" onClick={onBackgroundClick} />
    <Card className="modal-card" >
      {children}
    </Card>
  </StyledModal>
);
