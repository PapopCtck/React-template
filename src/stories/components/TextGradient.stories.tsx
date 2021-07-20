import { Story, Meta } from '@storybook/react';
import { HTMLAttributes } from 'react';

import { TextGradient } from '@/components';

export default {
  title: 'Components/TextGradient',
  component: TextGradient,
  parameters: {
    docs: {
      description: {
        component: 'TASTE THE RAINBOW',
      },
    },
  },
} as Meta;

const Template: Story<HTMLAttributes<HTMLDivElement>> = (args) => <TextGradient {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  children: 'This is a gradient capable text!',
  color: 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);',
};
