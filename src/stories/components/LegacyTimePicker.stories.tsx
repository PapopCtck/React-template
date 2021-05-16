import { Story, Meta } from '@storybook/react/types-6-0';

import { LegacyTimePicker, ILegacyTimepicker } from '../../components';

export default {
  title: 'Components/LegacyTimePicker',
  component: LegacyTimePicker,
} as Meta;

const Template: Story<ILegacyTimepicker> = (args) => <div style={{ maxWidth: '200px' }}>
  <LegacyTimePicker {...args} />
</div>;

export const Simple = Template.bind({});
Simple.args = {
};
