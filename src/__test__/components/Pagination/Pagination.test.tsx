import { render, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { Pagination } from '@/components';

test('render without crash',() => {
  render(<Pagination count={10} pageRangeDisplayed={3} marginPagesDisplayed={2} />);
});

test('render with correct range before and after click',async () => {
  const { getByText, queryByText } = render(<Pagination count={10} pageRangeDisplayed={3} marginPagesDisplayed={2} />);
  await waitFor(() => getByText('1'));
  getByText('2');
  const three = getByText('3');
  getByText('9');
  getByText('10');
  userEvent.click(three);
  await waitFor(() => {
    expect(queryByText('1')).not.toBeInTheDocument();
    expect(queryByText('4')).toBeInTheDocument();
  });
});
