import { render } from 'test-utils';
import { Suspense } from 'react';

import { Home } from '@/pages';

test('render without crashing',async () => {
  const { findByText } = render(<Suspense fallback={<div />}> <Home /></Suspense>);

  findByText('ยินดีต้อนรับสู่ React และ react-i18next');
});
