// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { Modal, IModalProps } from '../../components';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      inlineStories: false,
      story: {
        iFrameHeight: 500,
      },
    },
  },
} as Meta;

const Template: Story<IModalProps> = (args) => <Modal {...args} />;

export const String = Template.bind({});
String.args = {
  show: true,
  children: 'Hello, Modal',
};
