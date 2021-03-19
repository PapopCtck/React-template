import { Story, Meta } from '@storybook/react';

import { ProgressBar, IProgressBar } from '../../components';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    backgroundColor: { control: 'color' },
    fillerColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IProgressBar> = (args) => <ProgressBar {...args} />;

export const Simple = Template.bind({});
Simple.args = {
};
