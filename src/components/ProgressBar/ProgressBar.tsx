import { ReactElement } from 'react';
import { useTheme } from '@emotion/react/macro';

import { colorMix } from '@/utils';
import { IProgressBar } from './ProgressBar.interfaces';
import { StyledProgrssBarContianer } from './ProgressBar.styles';


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
