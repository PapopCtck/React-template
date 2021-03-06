import { render, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { OTPInput } from '@/components';

test('render without crash',() => {
  render(<OTPInput count={4} />);
});

test('render with the provided range',async () => {
  const range = 6;
  const { getAllByRole } = render(<OTPInput count={range} />);
  await waitFor(() => expect(getAllByRole('textbox').length).toBe(range));
});

test('resend button should be render',async () => {
  const { getByText } = render(<OTPInput count={4} resendBtn={true} />);
  await waitFor(() => getByText('ขอหมายเลข OTP อีกครั้ง'));
});

test('should be able to input',async () => {
  const { getAllByRole } = render(<OTPInput count={4} resendBtn={true} />);
  const inputs = await waitFor(() => getAllByRole('textbox'));
  userEvent.type(inputs[0],'1234');
  expect(inputs[0]).toHaveValue('1');
  expect(inputs[1]).toHaveValue('2');
  expect(inputs[2]).toHaveValue('3');
  expect(inputs[3]).toHaveValue('4');
});
