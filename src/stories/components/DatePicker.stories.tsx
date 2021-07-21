import { Story, Meta } from '@storybook/react/types-6-0';

import { DatePicker, IDatePicker } from '@/components';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
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

const Template: Story<IDatePicker> = (args) => <DatePicker {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  label: 'Label',
  value: '2021-03-12',
};
