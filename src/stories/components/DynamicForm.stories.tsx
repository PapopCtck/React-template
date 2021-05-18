import { Story, Meta } from '@storybook/react';
import { v4 as uuidv4 } from 'uuid';

import { DynamicForm, IDynamicForm, InputWithLength, Form, IDynamicFormTemplate } from '../../components';

export default {
  title: 'Components/DynamicForm',
  component: DynamicForm,
  parameters: {
    docs: {
      description: {
        component: 'Cause one form is never enough',
      },
    },
  },
  argTypes: {
    data: {
      description: 'data for template render',
    },
    template: {
      description: 'template of form',
    },
    onAdd: {
      description: 'Callback on add button click',
    },
    addText: {
      description: 'Text for add button',
    },
    maxLength: {
      description: 'Maximum length of form',
    },
    customFunction: {
      description: 'other function to be pass to template',
    },
    edit: {
      description: 'disable add function',
    },
  },
} as Meta;

const Template: Story<IDynamicForm> = (args) => <DynamicForm {...args} />;

let data = [{ id: uuidv4(), 'value': {} }];

const RenderTemplate = (props: IDynamicFormTemplate) => <Form>
  <InputWithLength label={`input ${props.index}`}/>
</Form>;

export const Simple = Template.bind({});
Simple.args = {
  data: data,
  template: <RenderTemplate />,
  onDataChange: newData => data = newData,
};
