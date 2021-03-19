import { Story, Meta } from '@storybook/react';

import { Input, IInput } from '../../components';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

const Template: Story<IInput> = (args) => <Input {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  type: 'number',
};
