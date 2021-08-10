import styled from '@emotion/styled/macro';

import { IStyledProgrssBarContianer } from './ProgressBar.interfaces';

export const StyledProgrssBarContianer = styled.div<IStyledProgrssBarContianer>`
position: relative;
height: 20px;
width: 100%;
border-radius: 50px;
background: ${props => props.backgroundColor};
display: flex;
justify-content: center;
align-items: center;
.filler {
  background: ${props => props.fillerColor};;
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.value {
  position: relative;
  z-index: 1;
  font-size: 12px;
  margin-right: ${props => props.theme.spaces.mg2};
  color: ${props => props.theme.textColorSecondary};
}
`;
