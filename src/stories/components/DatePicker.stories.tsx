import { Story, Meta } from '@storybook/react/types-6-0';

import { CustomDatePicker, IDatePicker } from '../../components';

export default {
  title: 'Components/DatePicker',
  component: CustomDatePicker,
} as Meta;

const Template: Story<IDatePicker> = (args) => <CustomDatePicker {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  label: 'Label',
  value: '2021-03-12',
};
