import { render } from '../test-utils';
import { Suspense } from 'react';

import { Home } from '../../pages';
import { setupI18nMock } from '../__mocks__/MockReactI18n';

setupI18nMock();

test('render without crashing',async () => {
  const { findByText } = render(<Suspense fallback={<div />}> <Home /></Suspense>);

  findByText('ยินดีต้อนรับสู่ React และ react-i18next');
});
