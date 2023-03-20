import React from 'react';
import SQLQuery from './SQLQuery';

export default {
  component: SQLQuery,
  title: "SQL Query"
};

const Template = args => <SQLQuery {...args} />;

export const Default = Template.bind({});
Default.args = {
  query: 'select t.timestamp, t.value_eth as amount, t.hash as hash from ethereum.transaction t limit 10',
  title: 'Sample SQL Query',
  num: 3
};

