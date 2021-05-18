// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import { Table } from '../../components';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'Simple table wrap with styled',
      },
    },
  },
} as Meta;

const Template: Story = (args) => <Table {...args}>
  <thead>
    <tr>
      <th>header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>body</td>
    </tr>
  </tbody>
</Table>;

export const Simple = Template.bind({});
Simple.args = {
};
