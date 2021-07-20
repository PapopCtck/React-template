import { Story, Meta } from '@storybook/react/types-6-0';

import { CustomDatePicker, IDatePicker } from '@/components';

export default {
  title: 'Components/DatePicker',
  component: CustomDatePicker,
  argTypes: {
    value: {
      description: 'Date string',
    },
    block: {
      description: 'Should input display at 100% width',
    },
    suffix: {
      description: 'Node to render at the end of Input',
    },
    errorMessage: {
      description: 'Error message to use with `Form` validation',
    },
    customValidate: {
      description: 'should display custom message instead of error message',
    },
    customValidateMessage: {
      description: 'custom message',
    },
    dateFormat: {
      description: 'date format of react-datepicker',
    },
    valueFormat: {
      description: 'date format of value and return value',
    },
  },
} as Meta;

const Template: Story<IDatePicker> = (args) => <CustomDatePicker {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  label: 'Label',
  value: '2021-03-12',
};
