import { Story, Meta } from '@storybook/react';

import { InputWithLength, IInputWithLength, Form, Button } from '@/components';

export default {
  title: 'Components/InputWithLength',
  component: InputWithLength,
  parameters: {
    docs: {
      description: {
        component: 'Custom input with many functionalities, many many functionalities',
      },
    },
  },
  argTypes: {
    block: {
      description: 'Should input display at 100% width',
    },
    maxLength: {
      description: 'Input value maxlength',
    },
    prefix: {
      description: 'node to render at the front of input',
    },
    suffix: {
      description: 'node to render at the end of input',
    },
    errorMessage: {
      description: 'error message for `Form` validate',
    },
    customValidate: {
      description: 'should display custom message instead of error message',
    },
    customValidateMessage: {
      description: 'custom message',
    },
  },
} as Meta;

const Template: Story<IInputWithLength> = (args) => <InputWithLength {...args} />;
Template.parameters = {
  jest: ['InputWithLength.test.tsx'],
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  label: 'Input with length',
  block: true,
  maxLength: 20,
};

const TemplateCustomValidate: Story<IInputWithLength> = (args) => <Form role="form">
  <InputWithLength {...args} />
  <Button type="submit">Submit</Button>
</Form>;

export const CustomValidate = TemplateCustomValidate.bind({});
CustomValidate.args = {
  label: 'Input with customvalidate (After submit)',
  block: true,
  maxLength: 20,
  errorMessage: 'error',
  customValidate: true,
  customValidateMessage: 'this is a custom message',
  required: true,
  suffix: 'test',
};
