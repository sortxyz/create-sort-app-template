import React from 'react';
import LatestTransactions from './LatestTransactions';

export default {
  component: LatestTransactions,
  title: "Latest Transactions"
};

const Template = args => <LatestTransactions {...args} />;

export const Default = Template.bind({});
Default.args = {
  contract_address: '0x00000000006c3852cbef3e08e8df289169ede581',
  title: 'OpenSea'
};

