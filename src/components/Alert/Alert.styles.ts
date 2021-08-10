import styled from '@emotion/styled/macro';
import { motion } from 'framer-motion';
import { X } from 'react-feather';
import { IStyledAlert } from './Alert.interfaces';

export const StyledAlert = styled(motion.div)<IStyledAlert>(props => ({
  maxHeight: 0,
  overflow: 'hidden',
  transition: 'max-height 0.5s ease-in',
  borderRadius: '4px',
  width: 'fit-content',
  minWidth: '200px',
  margin: `${props.theme.spaces.mg3} auto`,
  fontSize: props.theme.fontSizeBase,
  position: 'relative',
}),
props => props.show && ({
  padding: `${props.theme.spaces.pd2} ${props.theme.spaces.pd4}`,
  maxHeight: 'fit-content',
}),
props => props.absolute && ({
  position: 'absolute',
  left: 0,
  right: 0,
  margin: '0 auto',
}),
props => props.standalone && ({
  opacity: props.show ? 1 : 0,
  transition: 'opacity 0.5s ease-in',
}),
);

export const Close = styled(X)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const Icon = styled.span`
  font-size: 0;
  margin-right: ${props => props.theme.spaces.mg3};
`;

export const AlertContent = styled.div`
  display: flex;
  align-items: center;
`;

export const AlertsContainer = styled.div`
  position: fixed;
  z-index: 999999;
  top: 0;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;
