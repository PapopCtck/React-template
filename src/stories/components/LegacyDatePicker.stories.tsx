import { Story, Meta } from '@storybook/react/types-6-0';

import { LegacyDatepicker, ILegacyDatepicker } from '@/components';

export default {
  title: 'Components/LegacyDatepicker',
  component: LegacyDatepicker,
  parameters: {
    docs: {
      description: {
        component: 'Sometimes, they just want it the old way',
      },
    },
  },
  argTypes: {
    maxYear: {
      description: 'Maximum year for year select in BE',
    },
    minYear: {
      description: 'Minimum year for year select in BE',
    },
    showDate: {
      description:'Show or hide date select',
    },
    showMonth: {
      description:'Show or hide month select',
    },
    showYear: {
      description:'Show or hide year select',
    },
    zeroFill: {
      description: 'add zero(es) to the missing field',
    },
    language: {
      description: 'language for text display',
    },
  },
} as Meta;

const Template: Story<ILegacyDatepicker> = (args) => <LegacyDatepicker {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  maxYear: 2560,
  minYear: 2541,
};
