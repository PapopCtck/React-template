import { Story, Meta } from '@storybook/react';

import { Select, ISelect, ICustomSelectProps } from '../../components';

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Your choice, choose',
      },
    },
  },
  argTypes: {
    block: {
      description: 'Should input display at 100% width',
    },
    showSelect: {
      description: 'Show checkbox in options',
    },
    allKeyword: {
      description: 'keyword for all selected',
    },
    customCarret: {
      description: 'custom carret element',
    },
  },
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
