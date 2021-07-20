import { Story, Meta } from '@storybook/react/types-6-0';

import { Alert, IAlert } from '@/components';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes:{
    type:{
      description: 'Type of alert. One of',
    },
    show:{
      description: 'is alert currently showing',
    },
    closable:{
      description: 'show close button at top right corner',
    },
    styleCloseBtn: {
      description: 'Style for close button',
    },
    styleBanner: {
      description: 'Style for alert banner',
    },
    duration: {
      description: 'Duration before alert auto close',
    },
    absolute: {
      description: 'Should alert position be absolute',
    },
    standalone: {
      description: 'Is alert render in list',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Element for user notification.',
      },
    },
  },
} as Meta;

const Template: Story<IAlert> = (args) => <Alert {...args} />;

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  show: true,
  closable: true,
  children: 'Success',
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
  show: true,
  closable: true,
  children: 'Danger',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  show: true,
  closable: true,
  children: 'Warning',
};
