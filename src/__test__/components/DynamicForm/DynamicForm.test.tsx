import { fireEvent, render } from 'test-utils';

import { IDynamicForm } from '@/components';
import { Simple } from '@/stories/components/DynamicForm.stories';

test('render without crash',() => {
  const { getByRole } = render(<Simple {...Simple.args as IDynamicForm} />);
  getByRole('textbox');
});

test('can add form to list',() => {
  const { getByRole, getByText, getAllByRole } = render(<Simple {...Simple.args as IDynamicForm} />);
  getByRole('textbox');
  fireEvent.click(getByText('Add'));
  expect(getAllByRole('textbox').length).toBe(2);
});
