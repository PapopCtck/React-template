import { Story, Meta } from '@storybook/react/types-6-0';

import { Collapse, ICollapse } from '../../components';

export default {
  title: 'Components/Collapse',
  component: Collapse,
} as Meta;

const Template: Story<ICollapse> = (args) => <Collapse {...args}>{args.children}</Collapse>;

export const Simple = Template.bind({});
Simple.args = {
  title: 'Title',
  children: 'this is simple collapse',
  standalone: true,
  isCollpased: false,
};

const MultiTemplate: Story<ICollapse> = (args) => <>
  <Collapse {...args} title="Collapse 1" isCollpased={false}>Content 1</Collapse>
  <Collapse {...args} title="Collapse 2">Content 2</Collapse>
</>;

export const Multiple = MultiTemplate.bind({});
Multiple.args = {
};
