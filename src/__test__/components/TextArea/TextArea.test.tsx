import { render } from '../../test-utils';
import userEvent from '@testing-library/user-event';

import { TextArea } from '../../../components';

test('render without crash',() => {
  const { getByRole } = render(<TextArea />);
  getByRole('textbox');
});

test('input must show range',() => {
  const TestPhrase = 'test';
  const { getByRole, getByText } = render(<TextArea maxLength={20} />);
  const input = getByRole('textbox');
  getByText('0/20');
  userEvent.type(input,TestPhrase);
  expect(input).toHaveValue(TestPhrase);
  getByText(`${TestPhrase.length}/20`);
});


test('input must limit range',() => {
  const TestPhrase = 'this is a really long phrase';
  const { getByRole, getByText } = render(<TextArea maxLength={20} />);
  const input = getByRole('textbox');
  getByText('0/20');
  userEvent.type(input,TestPhrase);
  expect(input).toHaveValue(TestPhrase.substring(0,20));
  getByText('20/20');
});
