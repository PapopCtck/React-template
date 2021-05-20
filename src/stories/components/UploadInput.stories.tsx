// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { UploadInput, IUploadInput } from '../../components';

export default {
  title: 'Components/UploadInput',
  component: UploadInput,
  parameters: {
    docs: {
      description: {
        component: 'That look kinda nice, wanna upload it?',
      },
    },
  },
  argTypes: {
    label: {
      description: 'placeholder for before upload',
    },
    objectFit: {
      description: 'css object fit',
    },
    multiple: {
      description: 'show multiple or single upload',
    },
    deleteButton:{
      description: 'element for delete button',
    },
    dropText: {
      description:'text for drag and drop',
    },
    sizeExceedWarning: {
      description: 'warning for size limit exceed',
    },
    maxImage: {
      description: 'Maximum number of images that can be upload',
    },
    maxVideo: {
      description: 'Maximum video of images that can be upload',
    },
    limit: {
      description: 'Add limit max image and video',
    },
    limitExceedWarning: {
      description: 'warning for number of images or videos limit exceed',
    },
    supportedImageExtensions: {
      description: 'image extensions that can be upload',
    },
    supportedVideoExtensions: {
      description: 'video extensions that can be upload',
    },
    validated: {
      description: 'is form validated. To show if no value if this input is required',
    },
  },
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
