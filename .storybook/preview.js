
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

import { ThemeProvider, Global } from '@emotion/react';

import { GlobalStyle } from "../src/utils";
import defaultTheme from '../src/themes/default';

export const decorators = [(Story) => (
  <>
    <GlobalStyle theme={defaultTheme} />
    <Story />
  </>
), (Story) => (
  <ThemeProvider theme={defaultTheme}>
    <Story />
  </ThemeProvider>
)];
