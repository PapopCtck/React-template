import { ReactElement } from 'react';
import { Global, Theme } from '@emotion/react';

export interface IGlobalStyle{
  theme: Theme,
}

export const GlobalStyle = ({ theme }: IGlobalStyle): ReactElement => (
  <Global styles={{
    '#root': {
      fontSize: theme.fontSizeBase,
      fontFamily: theme.fontFamily,
      color: theme.textColor,
      'h1,h2,h3,h4,h5,h6': {
        color: theme.headingColor,
      },
    },
  }} />
);
