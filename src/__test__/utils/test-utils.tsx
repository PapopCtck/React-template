import { FC, ReactElement, Suspense } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import defaultTheme from '@/themes/default';

const AllTheProviders: FC = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ThemeProvider theme={defaultTheme}>
      {children}
    </ThemeProvider>
  </Suspense>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
