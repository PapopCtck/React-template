import { render, waitFor } from 'test-utils';
import { Alert } from '@/components';

beforeEach(() => {
  jest.useFakeTimers('legacy');
});

afterEach(() => {
  //fake timer cleanup
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('render without crach',async () => {
  const children = 'Success';
  const { getByText } = render(<Alert>{children}</Alert>);
  await waitFor(() => getByText(children));
});


test('auto disappear',async () => {
  const children = 'Timer';
  const duration = 1000;
  const onclose = jest.fn();
  const { getByText } = render(<Alert onCloseClick={onclose} duration={duration}>{children}</Alert>);
  await waitFor(() => getByText(children));
  jest.runOnlyPendingTimers();
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
  expect(onclose).toBeCalled();
});

