import React from 'react'
import Chat from '../components/chat'

export default {
  title: 'Chat',
  component: Chat
};

const Template = (args) => <Chat {...args} />
export const ChatInfo = Template.bind({});
ChatInfo.args = {
  chatHeight: '600',
  roomAddress: '0xbe0acae9883e5e47c012c79241af84959010e9c3'
};
