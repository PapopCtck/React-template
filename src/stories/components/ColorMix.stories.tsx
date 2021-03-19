// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { colorMix } from '../../utils';

export default {
  title: 'Components/ColorMix',
  argTypes: {
    color: { control : 'color' },
  },
} as Meta;

const Template: Story = (args) => <>
  <div style={{ color: colorMix(args.color,1) }}>index 1</div>
  <div style={{ color: colorMix(args.color,2) }}>index 2</div>
  <div style={{ color: colorMix(args.color,3) }}>index 3</div>
  <div style={{ color: colorMix(args.color,4) }}>index 4</div>
  <div style={{ color: colorMix(args.color,5) }}>index 5</div>
  <div style={{ color: colorMix(args.color,6) }}>index 6 (Base color)</div>
  <div style={{ color: colorMix(args.color,7) }}>index 7</div>
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
