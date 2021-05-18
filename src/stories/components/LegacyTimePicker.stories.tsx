import { Story, Meta } from '@storybook/react/types-6-0';

import { LegacyTimePicker, ILegacyTimepicker } from '../../components';

export default {
  title: 'Components/LegacyTimePicker',
  component: LegacyTimePicker,
  parameters: {
    docs: {
      description: {
        component: 'Sometimes, they just want it the old way',
      },
    },
  },
  argTypes: {
    language: {
      description: 'language for text display',
    },
  },
} as Meta;

const Template: Story<ILegacyTimepicker> = (args) => <div style={{ maxWidth: '200px' }}>
  <LegacyTimePicker {...args} />
</div>;

export const Simple = Template.bind({});
Simple.args = {
};
