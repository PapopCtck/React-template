
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ['Documentation', 'Pages', ['Home'], 'Components'],
    },
  },
}

import { ThemeProvider } from '@emotion/react';
import { withTests } from '@storybook/addon-jest';

import { GlobalStyle } from "../src/utils";
import defaultTheme from '../src/themes/default';

import results from 'test-results/.jest-results.json';

export const decorators = [(Story) => (
  <>
    <GlobalStyle theme={defaultTheme} />
    <Story />
  </>
), (Story) => (
  <ThemeProvider theme={defaultTheme}>
    <Story />
  </ThemeProvider>
), withTests({ results })];
