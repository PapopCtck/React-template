import { Story, Meta } from '@storybook/react';

import { ProgressBar, IProgressBar } from '../../components';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: '100% 200% 300%',
      },
    },
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    fillerColor: { control: 'color' },
    percent: {
      description: 'percentage of fill `0-100`',
    },
    showValue: {
      description: 'show value text',
    },
    value:{
      description: 'text of value',
    },
    divider:{
      description: 'text of divider',
    },
  },
} as Meta;

const Template: Story<IProgressBar> = (args) => <ProgressBar {...args} />;

export const Simple = Template.bind({});
Simple.args = {
};
