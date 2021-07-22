import { act, fireEvent, render, waitFor } from 'test-utils';
import { Simple } from '@/stories/components/ProgressiveImage.stories';
import { setupIntersectionObserverMock } from '../../__mocks__/MockIntersectionObserver';

const construct = jest.fn();
const observe = jest.fn();
const unobserve = jest.fn();

setupIntersectionObserverMock({ observe, construct });

test('render from src',async () => {
  const mockEntry = { isIntersecting: true };
  const args = Simple.args;
  const alt = args?.alt ?? '';
  const { getByTestId,findAllByAltText } = render(<Simple {...args} />);
  await waitFor(() => getByTestId('container'));
  expect(observe).toBeCalled();
  act(() => {
    const observerCallback = construct.mock.calls[0][0];
    observerCallback([mockEntry],{ unobserve });
  });
  const allImgs = await findAllByAltText(alt);
  const thumbNail = allImgs[0];
  const realImage = allImgs[1];
  expect(thumbNail).toHaveAttribute('src',`${args?.src}/60`); 
  expect(realImage).toHaveAttribute('src',args?.src);
  fireEvent.load(realImage);
  expect(thumbNail).not.toBeVisible();
  expect(realImage).toBeVisible();
});

test('render without crash',async () => {
  const { getByTestId,findAllByAltText } = render(<Simple {...Simple.args} />);
  await waitFor(() => getByTestId('container'));
  expect(findAllByAltText(Simple.args?.alt ?? '')).not.toBeNull();
});
