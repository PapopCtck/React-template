// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { Modal, IModal } from '@/components';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      inlineStories: false,
      story: {
        iFrameHeight: 500,
      },
      description: {
        component: 'Display content above the other',
      },
    },
  },
  argTypes: {
    show: {
      description: 'show or hide modal',
    },
    fullscreen: {
      description: 'render modal content as fullscreen page on these size',
    },
  },
} as Meta;

const Template: Story<Pick<IModal,'children'|'show'|'onBackgroundClick'|'fullscreen'|'maxWidth'>> = (args) => <Modal {...args} />;

export const String = Template.bind({});
String.args = {
  show: true,
  children: 'Hello, Modal',
};
