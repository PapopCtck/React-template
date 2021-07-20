import { render } from 'test-utils';
import { act } from 'react-dom/test-utils';
import { Avatar, IAvatar } from '@/components';

import { Image } from '@/stories/components/Avatar.stories';

import { setupIntersectionObserverMock } from '../../__mocks__/MockIntersectionObserver';

const observe = jest.fn();
const construct = jest.fn();
const unobserve = jest.fn();

setupIntersectionObserverMock({ observe, construct });

test('render without crashing',async () => {
  const { getByText } = render(<Avatar name="Test user" size="32px" />); 
  const avatar = getByText('Te');
  expect(avatar.style.width).toBe('32px');
});

test('render image from src',async () => {
  const args = Image.args as IAvatar;
  const name = args.name;
  const mockEntry = { isIntersecting: true };
  const { findAllByAltText } = render(<Image {...args} />);
  expect(observe).toBeCalled();
  act(() => {
    const observerCallback = construct.mock.calls[0][0];
    observerCallback([mockEntry],{ unobserve });
  });
  const allImgs = await findAllByAltText(name);
  expect(allImgs[1]).toHaveAttribute('src',args.src); //target real image
});
