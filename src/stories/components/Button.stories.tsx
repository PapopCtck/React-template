import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, IButtonProps } from '../../components';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IButtonProps> = (args) => <Button {...args}>{args.label}</Button>;

export const Primary = Template.bind({});
Primary.args = {
  buttonType: 'primary',
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Link = Template.bind({});
Link.args = {
  buttonType: 'link',
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
