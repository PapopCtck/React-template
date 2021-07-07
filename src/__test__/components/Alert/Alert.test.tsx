import { render } from '../../test-utils';
import { Alert } from '../../../components';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  //fake timer cleanup
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('render without crach',() => {
  const children = 'Success';
  const { getByText } = render(<Alert>{children}</Alert>);
  getByText(children);
});


test('auto disappear',async () => {
  const children = 'Timer';
  const duration = 1000;
  const onclose = jest.fn();
  const { getByText } = render(<Alert onCloseClick={onclose} duration={duration}>{children}</Alert>);
  getByText(children);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
  jest.runOnlyPendingTimers();
  expect(onclose).toBeCalled();
});

