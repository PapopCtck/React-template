import { ReactElement } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { colorMix } from '../../utils';

export interface IStyledProgrssBarContianer {
  backgroundColor: string,
  fillerColor: string,
}

export interface IProgressBar {
  percent?: number,
  backgroundColor?: string,
  fillerColor?: string,
  value?: string,
  divider?: string,
  showValue: boolean,
}

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
    margin-right: 8px;
    color: ${props => props.theme.textColorSecondary};
  }
`;

export const ProgressBar = ({ percent = 0, backgroundColor, fillerColor, value = 'N/A',divider = 'N/A', showValue = false }: IProgressBar): ReactElement => {
  const showRecent = percent !== 0 ? percent > 15 ? Math.min(percent,100) : 15 : 0;
  const theme = useTheme();
  return <StyledProgrssBarContianer backgroundColor={backgroundColor || colorMix(theme.primaryColor,1)} fillerColor={fillerColor || theme.primaryColor}>
    <div className="value">
      {showValue && `${value} / ${divider}`}
    </div>
    <div className="filler" style={{ width: `${showRecent}%` }} />
  </StyledProgrssBarContianer>;
};
