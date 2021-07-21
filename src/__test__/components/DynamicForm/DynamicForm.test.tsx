import { fireEvent, render, waitFor } from 'test-utils';

import { IDynamicForm } from '@/components';
import { Simple } from '@/stories/components/DynamicForm.stories';

test('render without crash',async () => {
  const { getByRole } = render(<Simple {...Simple.args as IDynamicForm} />);
  await waitFor(() => getByRole('textbox'));
});

test('can add form to list',async () => {
  const { getByRole, getByText, getAllByRole } = render(<Simple {...Simple.args as IDynamicForm} />);
  await waitFor(() => getByRole('textbox'));
  fireEvent.click(getByText('Add'));
  expect(getAllByRole('textbox').length).toBe(2);
});
