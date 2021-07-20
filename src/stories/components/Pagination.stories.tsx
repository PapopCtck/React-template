import { Story, Meta } from '@storybook/react';

import { Pagination, IPagination } from '@/components';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Ui Element for page number',
      },
    },
  },
  argTypes: {
    count:{
      description: 'Number of total pages',
    },
    pageRangeDisplayed: {
      description: 'page range to be display',
    },
    marginPagesDisplayed: {
      description: 'pages to display as a margin at the front and the end',
    },
    currentPage: {
      description: 'currently select page',
    },
    nextLabel: {
      description: 'label for next button',
    },
    nextStyle: {
      description: 'style for next button',
    },
    prevLabel: {
      description: 'label for prev button',
    },
    prevStyle: {
      description: 'style for prev button',
    },
    breakLabel: {
      description: 'label for break when there\'re too many page to be render',
    },
  },
} as Meta;

const Template: Story<IPagination> = (args) => <Pagination {...args} />;
Template.parameters = {
  jest: ['Pagination.test.tsx'],
};

export const Simple = Template.bind({});
Simple.args = {
  count: 10,
  pageRangeDisplayed: 3,
  marginPagesDisplayed: 2,
  currentPage: 5,
};
