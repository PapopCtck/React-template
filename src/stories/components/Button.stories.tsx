import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, IButtonProps } from '../../components';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    buttonType: {
      description: 'Choose between',
    },
    label: {
      description: 'Text to display oin button',
    },
    size :{
      description: 'Choose between',
    },
    type: {
      description: 'Html button type',
    },
    block: {
      description: 'Should button display at 100% width',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Click click',
      },
    },
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
  buttonType: 'secondary',
};

export const Link = Template.bind({});
Link.args = {
  buttonType: 'link',
  label: 'Button',
};

export const Warning = Template.bind({});
Warning.args = {
  buttonType: 'warning',
  label: 'Button',
};

export const Danger = Template.bind({});
Danger.args = {
  buttonType: 'danger',
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
