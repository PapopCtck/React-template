// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { colorMix } from '@/utils';

export default {
  title: 'Components/ColorMix',
  argTypes: {
    color: { control : 'color' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Cause it look cooler this way',
      },
    },
  },
} as Meta;

const Template: Story = (args) => <>
  <div style={{ color: colorMix(args.color,1) }}>index 1 {colorMix(args.color,1)}</div>
  <div style={{ color: colorMix(args.color,2) }}>index 2 {colorMix(args.color,2)}</div>
  <div style={{ color: colorMix(args.color,3) }}>index 3 {colorMix(args.color,3)}</div>
  <div style={{ color: colorMix(args.color,4) }}>index 4 {colorMix(args.color,4)}</div>
  <div style={{ color: colorMix(args.color,5) }}>index 5 {colorMix(args.color,5)}</div>
  <div style={{ color: colorMix(args.color,6) }}>index 6 (Base color) {colorMix(args.color,6)}</div>
  <div style={{ color: colorMix(args.color,7) }}>index 7 {colorMix(args.color,7)}</div>
  <div style={{ color: colorMix(args.color,8) }}>index 8 {colorMix(args.color,8)}</div>
  <div style={{ color: colorMix(args.color,9) }}>index 9 {colorMix(args.color,9)}</div>
  <div style={{ color: colorMix(args.color,10) }}>index 10 {colorMix(args.color,10)}</div>
</>;

export const Simple = Template.bind({});
Simple.args = {
  color: '#52c41a',
};

Simple.parameters = {
  docs: {
    source: {
      code: 'colorMix(color,index)',
    },
  },
};
