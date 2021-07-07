import { Story, Meta } from '@storybook/react';

import { ProgressiveImage, IProgressiveImage } from '../../components';

export default {
  title: 'Components/ProgressiveImage',
  component: ProgressiveImage,
  parameters: {
    docs: {
      description: {
        component: 'If **medium** can do it. Why can\'t we?',
      },
    },
  },
  argTypes: {
    src: {
      description: 'Image src',
    },
    srcSet: {
      description: 'Images src for responsive image loading',
    },
    widthPrefix: {
      description: 'for default srcset to generate url from base src as `${src}${widthPrefix}someWidth`',
    },
    animationUrl: {
      description: 'Image url for display animated image on hover',
    },
    thumbWidth: {
      description: 'width to load thumb',
    },
    objectFit: {
      description: 'css object fit property',
    },
  },
} as Meta;

const Template: Story<IProgressiveImage> = (args) => <div style={{ width: '500px', aspectRatio: '16/9' }}>
  <ProgressiveImage {...args} />;
</div>;

Template.parameters = {
  jest: ['ProgressiveImage.test.tsx'],
};

export const Simple = Template.bind({});
Simple.args = {
  src: 'https://picsum.photos/id/1018/500',
  alt: 'Progressive loading',
  widthPrefix: '/',
};
