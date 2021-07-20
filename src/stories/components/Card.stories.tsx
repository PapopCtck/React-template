import { Story, Meta } from '@storybook/react/types-6-0';

import { Card,Button } from '@/components';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'It\'s a Card',
      },
    },
  },
} as Meta;

const Template: Story = (args) => <Card {...args}>{args.children}</Card>;

export const String = Template.bind({});
String.args = {
  children: 'Hello, card',
};

export const Node = Template.bind({});
Node.args = {
  children: <Button>Hello</Button>,
};
