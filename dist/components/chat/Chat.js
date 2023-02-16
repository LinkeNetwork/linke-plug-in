import React from 'react';
function Chat(props) {
    var roomAddress = props.roomAddress, chatHeight = props.chatHeight;
    return (React.createElement("div", { style: { height: chatHeight + 'px' } },
        React.createElement("iframe", { src: "https://linke.network/chat/".concat(roomAddress, "/ETHF?share=1"), width: "100%", height: "100%", frameBorder: "0" })));
}
export default Chat;
