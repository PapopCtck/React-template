// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { TextArea, ITextArea } from '../../components';

export default {
  title: 'Components/TextArea',
  component: TextArea,
} as Meta;

const Template: Story<ITextArea> = (args) => <TextArea {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  label: 'TextArea',
};

export const WithLength = Template.bind({});
WithLength.args = {
  label: 'TextArea',
  maxLength: 20,
};
