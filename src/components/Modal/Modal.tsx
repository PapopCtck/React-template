import { ReactElement } from 'react';

import Card from '../Card';
import { IModal } from './Modal.interfaces';
import { StyledModal } from './Modal.styles';

export const Modal = ({ children,show, onBackgroundClick,...rest }: IModal): ReactElement => (
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
