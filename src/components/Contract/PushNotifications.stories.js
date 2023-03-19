import React from 'react';
import PushNotifications from './PushNotifications';

export default {
  component: PushNotifications,
  title: "Push Notifications"
};

const Template = args => <PushNotifications {...args} />;

export const Default = Template.bind({});
Default.args = {
  contract_address: '0x00000000006c3852cbef3e08e8df289169ede581',
  title: 'OpenSea',
  num: 3
};

