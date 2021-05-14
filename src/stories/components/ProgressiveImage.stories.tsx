import { Story, Meta } from '@storybook/react';

import { ProgressiveImage, IProgressiveImage } from '../../components';

export default {
  title: 'Components/ProgressiveImage',
  component: ProgressiveImage,
} as Meta;

const Template: Story<IProgressiveImage> = (args) => <div style={{ width: '500px', aspectRatio: '16/9' }}>
  <ProgressiveImage {...args} />;
</div>;

export const Simple = Template.bind({});
Simple.args = {
  src: 'https://picsum.photos/id/1018',
  alt: 'Progressive loading',
  widthPrefix: '/',
};
