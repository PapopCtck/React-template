import { Story, Meta } from '@storybook/react/types-6-0';

import { Alert, IAlert } from '../../components';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
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
