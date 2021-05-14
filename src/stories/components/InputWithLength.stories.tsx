import { Story, Meta } from '@storybook/react';

import { InputWithLength, IInputWithLength, Form, Button } from '../../components';

export default {
  title: 'Components/InputWithLength',
  component: InputWithLength,
} as Meta;

const Template: Story<IInputWithLength> = (args) => <InputWithLength {...args} />;

export const NumberInput = Template.bind({});
NumberInput.args = {
  label: 'Input with length',
  block: true,
  maxLength: 20,
};

const TemplateCustomValidate: Story<IInputWithLength> = (args) => <Form>
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
