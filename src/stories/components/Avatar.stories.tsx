import { Story, Meta } from '@storybook/react';

import { Avatar, IAvatar } from '../../components';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    color: { 
      control: 'color', 
      description: 'Background color of avatar', 
    },
    name: { 
      description: 'User name for generate display name', 
    },
    size: {
      description: 'width and height in css string', 
    },
    loading: {
      description: 'Should avatar display content or loading skeleton',
    },
    src: {
      description: 'User avatar image src',
    },
    colors: {
      description: 'Replace preset colors for random background color',
    },
    srcset: {
      description: 'User avatar images src for responsive image loading',
    },
    style: {
      description: 'Css style',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'UI Element for display user avatar. Support image, text and loading skeleton',
      },
    },
  },
} as Meta;

const Template: Story<IAvatar> = (args) => <Avatar {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  name: 'Hello hello',
  size: '32px',
  loading: true,
};

export const Image = Template.bind({});
Image.args = {
  src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  name: 'Hello hello',
  size: '32px',
};

export const Name = Template.bind({});
Name.args = {
  name: 'Hello hello',
  size: '32px',
  style: {
    fontFamily: 'Nunito Sans,Helvetica Neue, Helvetica, Arial, sans-serif',
  },
};
