
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Documentation', 'Pages', ['Home'], 'Components'],
    },
  },
}

import { ThemeProvider } from '@emotion/react';
import { withTests } from '@storybook/addon-jest';

import { GlobalStyle } from "@/utils";
import defaultTheme from '@/themes/default';

import results from 'test-results/.jest-results.json';
import { Suspense } from 'react';

export const decorators = [(Story) => (
  <>
    <GlobalStyle theme={defaultTheme} />
    <Story />
  </>
), (Story) => (
  <ThemeProvider theme={defaultTheme}>
    <Story />
  </ThemeProvider>
), withTests({ results })
  , (Story) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Story />
    </Suspense>
  )];
