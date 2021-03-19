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
    },
  }} />
);
