import { Story, Meta } from '@storybook/react';
import { v4 as uuidv4 } from 'uuid';

import { DynamicForm, IDynamicForm, InputWithLength, Form, IDynamicFormTemplate } from '../../components';

export default {
  title: 'Components/DynamicForm',
  component: DynamicForm,
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
