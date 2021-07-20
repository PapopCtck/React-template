import { Story, Meta } from '@storybook/react/types-6-0';

import { Collapse, ICollapse } from '@/components';

export default {
  title: 'Components/Collapse',
  component: Collapse,
  parameters: {
    docs: {
      description: {
        component: 'To hide or not to hide',
      },
    },
  },
  argTypes: {
    standalone: {
      description: 'Change background color and add margin',
    },
    isCollapsed: {
      description: 'Whether to show or hide content',
    },
    customSuffix: {
      description: 'Replace right arrow render',
    },
    seperator: {
      description: 'Show grey bar between title and content',
    },
    noContent: {
      description:'Special flag to make content height 0',
    },
  },
} as Meta;

const Template: Story<ICollapse> = (args) => <Collapse {...args}>{args.children}</Collapse>;

export const Simple = Template.bind({});
Simple.args = {
  title: 'Title',
  children: 'this is simple collapse',
  standalone: true,
  isCollapsed: false,
};

const MultiTemplate: Story<ICollapse> = (args) => <>
  <Collapse {...args} title="Collapse 1" isCollapsed={false}>Content 1</Collapse>
  <Collapse {...args} title="Collapse 2">Content 2</Collapse>
</>;

export const Multiple = MultiTemplate.bind({});
Multiple.args = {
};
