// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { OTPInput, IOTPInput } from '../../components';

export default {
  title: 'Components/OTPInput',
  component: OTPInput,
} as Meta;

const Template: Story<IOTPInput> = (args) => <OTPInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  count: 4,
};
