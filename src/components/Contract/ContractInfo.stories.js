import React from 'react';
import ContractInfo from './ContractInfo';

export default {
  component: ContractInfo,
  title: "Contract Info"
};

const Template = args => <ContractInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  contract_address: '0x00000000006c3852cbef3e08e8df289169ede581',
  title: 'OpenSea'
};

