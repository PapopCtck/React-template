import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ReactElement, ReactNode } from 'react';
import { Card } from '../Card/Card';

export interface IStyledModal {
  show?: boolean,
}

export interface IModalProps {
  children?: ReactNode,
  show?: boolean, 
  onBackgroundClick? : () => void,
}

export const StyledModal = styled('div')<IStyledModal>(
  props => css`
  position: fixed;
  left: 0;
  top: 0;
  width:100%;
  height: 100%;
  z-index: 9999;
  display: none;
  justify-content: center;
  align-items: center;
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${props.theme.modalBackgroundColor};
  }
  .modal-card {
    height: auto;
    z-index: 10000;
  }
`,props => props.show && {
    display: 'flex',
  });

export const Modal = ({ children,show, onBackgroundClick }: IModalProps): ReactElement => (
  <StyledModal show={show}>
    <div className="modal-background" onClick={onBackgroundClick} />
    <Card className="modal-card" >
      {children}
    </Card>
  </StyledModal>
);
