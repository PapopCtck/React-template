import { act, fireEvent, render } from 'test-utils';
import { Simple } from '@/stories/components/ProgressiveImage.stories';
import { setupIntersectionObserverMock } from '../../__mocks__/MockIntersectionObserver';

const construct = jest.fn();
const observe = jest.fn();
const unobserve = jest.fn();

setupIntersectionObserverMock({ observe, construct });

test('render without crash',() => {
  const { findAllByAltText } = render(<Simple {...Simple.args} />);
  expect(findAllByAltText(Simple.args?.alt ?? '')).not.toBeNull();
});

test('render from src',async () => {
  const mockEntry = { isIntersecting: true };
  const args = Simple.args;
  const alt = args?.alt ?? '';
  const { findAllByAltText } = render(<Simple {...args} />);
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
