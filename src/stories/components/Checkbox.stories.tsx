import { Story, Meta } from '@storybook/react/types-6-0';

import { Checkbox, ICheckbox } from '../../components';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'Yes Yes Yes Yes',
      },
    },
  },
  argTypes: {
    checkmarkColor: { control: 'color' }, 
    borderColor: { control: 'color' },
    className: {
      description: 'className for hidden checkbox input',
    },
    containerClassname: {
      description: 'className for hidden checkbox input',
    },
    type: {
      description: 'Choose between',
    },
    label: {
      description: 'Checkbox label',
    },
    id: {
      description: 'Checkbox hidden input\'s id',
    },
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
