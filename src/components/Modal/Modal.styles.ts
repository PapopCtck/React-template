import { css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import { motion } from 'framer-motion';

import { IModal } from './Modal.interfaces';


export const StyledModal = styled(motion.div)<IModal>(
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
