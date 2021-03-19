import { Story, Meta } from '@storybook/react';

import { Avatar, IAvatar } from '../../components';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    color: { control: 'color' },
  },
} as Meta;

const Template: Story<IAvatar> = (args) => <Avatar {...args} />;

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
