import { Story, Meta } from '@storybook/react';

import { Pagination, IPagination } from '../../components';

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta;

const Template: Story<IPagination> = (args) => <Pagination {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  count: 10,
  pageRangeDisplayed: 3,
  marginPagesDisplayed: 2,
  currentPage: 5,
};
