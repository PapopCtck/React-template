import { Story, Meta } from '@storybook/react';

import { Select, ISelect, ICustomSelectProps } from '../../components';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

const Template: Story<ISelect & ICustomSelectProps> = (args) => <Select {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  placeholder: 'Select',
  children: <option value="Example">example</option>,
  block: true,
};

const CheckboxTemplate: Story<ISelect & ICustomSelectProps> = (args) => <Select {...args} />;

export const Checkbox = CheckboxTemplate.bind({});
Checkbox.args = {
  placeholder: 'Select',
  children:<option value="Example">example</option>,
  block: true,
  showSelect: true,
  value: 'Example',
};
