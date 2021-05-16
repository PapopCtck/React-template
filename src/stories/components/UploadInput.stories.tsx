// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { UploadInput, IUploadInput } from '../../components';

export default {
  title: 'Components/UploadInput',
  component: UploadInput,
} as Meta;

const Template: Story<IUploadInput> = (args) => <UploadInput {...args} />;

export const Single = Template.bind({});
Single.args = {
  value: {
    selectedFile: 'https://picsum.photos/id/1018/500',
  },
};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  value: [
    {
      selectedFile: 'https://picsum.photos/id/1018/180',
    },
    {
      selectedFile: 'https://picsum.photos/id/1000/180',
    },
  ],
};
