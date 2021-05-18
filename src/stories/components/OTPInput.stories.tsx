// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { OTPInput, IOTPInput } from '../../components';

export default {
  title: 'Components/OTPInput',
  component: OTPInput,
  parameters: {
    docs: {
      description: {
        component: 'OTP input for your otp need',
      },
    },
  },
  argTypes: {
    count: {
      description: 'number of input field',
    },
    invalid: {
      description: 'if data is invalid',
    },
    onLastInput: {
      description: 'callback when last input got input',
    },
    loading: {
      description: 'is otp loading',
    },
    resendBtn: {
      description: 'show or hide resend button',
    },
    delay: {
      description: 'Should there be a delay before submit again',
    },
    resendDelay: {
      description: 'delay before can submit otp again',
    },
    invalidMessage: {
      description: 'error message for invalid data',
    },
  },
} as Meta;

const Template: Story<IOTPInput> = (args) => <OTPInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  count: 4,
};
