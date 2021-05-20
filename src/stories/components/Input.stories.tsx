import { Story, Meta } from '@storybook/react';
import { InputHTMLAttributes } from 'react';

import { Input } from '../../components';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Simple html input with styled',
      },
    },
  },
} as Meta;

const Template: Story<InputHTMLAttributes<HTMLInputElement>> = (args) => <Input {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  type: 'number',
};
