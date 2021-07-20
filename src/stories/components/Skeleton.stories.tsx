import { Story, Meta } from '@storybook/react';

import { Skeleton,ISkeleton } from '@/components';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: 'This one can\'t dance though',
      },
    },
  },
  argTypes: {
    loading: {
      description: 'show or hide loading animation',
    },
    dark: {
      description: 'invert color for dark background',
    },
    duration: {
      description: 'animation duration',
    },
    delay: {
      description: 'animation delay',
    },
    type: {
      description: 'One of',
    },
  },
} as Meta;

const Template: Story<ISkeleton> = (args) => <Skeleton {...args} />;

export const Rectangle = Template.bind({});
Rectangle.args = {
  loading: true,
  width: '100px',
  height: '1rem',
  type: 'rectangle',
};

export const Cicle = Template.bind({});
Cicle.args = {
  loading: true,
  type: 'circle',
  width: '60px',
  height: '60px',
};
