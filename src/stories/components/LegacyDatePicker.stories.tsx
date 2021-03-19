import { Story, Meta } from '@storybook/react/types-6-0';

import { LegacyDatepicker, ILegacyDatepicker } from '../../components';

export default {
  title: 'Components/LegacyDatepicker',
  component: LegacyDatepicker,
} as Meta;

const Template: Story<ILegacyDatepicker> = (args) => <LegacyDatepicker {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  maxYear: 2560,
  minYear: 2541,
};
