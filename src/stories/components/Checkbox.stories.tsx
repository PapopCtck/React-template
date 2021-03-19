import { Story, Meta } from '@storybook/react/types-6-0';

import { Checkbox, ICheckbox } from '../../components';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checkmarkColor: { control: 'color' }, 
    borderColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ICheckbox> = (args) => <Checkbox {...args} />;

export const Circle = Template.bind({});
Circle.args = {
  checked: true,
  label: 'Label',
};

export const Box = Template.bind({});
Box.args = {
  checked: true,
  label: 'Label',
  type: 'box',
};
