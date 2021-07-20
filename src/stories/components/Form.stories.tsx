import { Meta, Story } from '@storybook/react';

import { Form, IForm, InputWithLength, Button } from '@/components';

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    docs: {
      description: {
        component: 'Simple form wrapper with validation',
      },
    },
  },
} as Meta;

const Template: Story<IForm> = (args) => <Form {...args} >
  <InputWithLength required={true} errorMessage="error" block/>
  <Button type="submit">Submit</Button>
</Form>;

export const Simple = Template.bind({});
Simple.args = {
};
