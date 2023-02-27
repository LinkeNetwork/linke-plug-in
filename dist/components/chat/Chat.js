import React, { useEffect, useState, useRef } from 'react';
import { detectMobile } from '../../utils/index';
import RoomInfo from './RoomInfo';
function Chat(props) {
    var _a = useState(false), showBackLogo = _a[0], setShowBackLogo = _a[1];
    var _iframe = useRef(null);
    var roomAddress = props.roomAddress, chatHeight = props.chatHeight;
    var _b = useState(false), showChatRoom = _b[0], setShowChatRoom = _b[1];
    var _c = useState(false), isCollapse = _c[0], setIsCollapse = _c[1];
    var _d = useState('100vh'), height = _d[0], setHeight = _d[1];
    var _e = useState('0xbe0acae9883e5e47c012c79241af84959010e9c3'), address = _e[0], setAddress = _e[1];
    var handleShowChat = function () {
        if (detectMobile()) {
            window.open("https://www.linke.network/chat/".concat(address, "/ETHF?share=1"), '_self');
        }
        setShowChatRoom(true);
    };
    var handleCollapse = function () {
        setIsCollapse(!isCollapse);
    };
    var _iframeOnload = function () {
        setShowBackLogo(true);
    };
    useEffect(function () {
        if (chatHeight) {
            setHeight(height);
        }
    }, [chatHeight]);
    useEffect(function () {
        if (roomAddress) {
            setAddress(roomAddress);
        }
    }, [roomAddress]);
    useEffect(function () {
        if (window.location.host !== 'www.linke.network' && detectMobile()) {
            setShowChatRoom(false);
        }
    }, [window.location]);
    return (React.createElement("div", { className: 'chat-container' },
        !showChatRoom && detectMobile() &&
            React.createElement("div", { className: 'logo-wrapper', onClick: handleShowChat },
                React.createElement("img", { src: 'https://www.linke.network/static/media/linke-logo.2e01f3e1ebbda0b13015e89c5e1357be.svg' })),
        !detectMobile() &&
            React.createElement("div", { className: "chat-box ".concat(showChatRoom ? 'collapse-height' : '') },
                React.createElement("div", { className: "chat-item ".concat(isCollapse ? 'chat-item-collapse' : '') },
                    React.createElement("div", { className: 'top-info' },
                        !showChatRoom
                            ? React.createElement("div", { className: 'title' }, "Messages")
                            : React.createElement("img", { src: "https://heras.igengmei.com/44e88af1-a8ad-4933-9585-478971f02202-1677051124153", alt: "", className: 'collapse-logo back-logo', onClick: function () { setShowChatRoom(false); } }),
                        React.createElement("img", { src: "https://heras.igengmei.com/b1076ea9-9366-4d75-8d68-7ec29cd96b3e-1677051145150", alt: "", className: 'collapse-logo', onClick: handleCollapse })),
                    !showChatRoom && React.createElement(RoomInfo, { roomAddress: address, handleShowChat: function () { setShowChatRoom(true); } }),
                    showChatRoom &&
                        React.createElement("iframe", { id: "iframe", ref: _iframe, onLoad: _iframeOnload, src: "https://www.linke.network/chat/".concat(address, "/ETHF?share=1"), width: "100%", height: "100%", frameBorder: "0" }))),
        showChatRoom && detectMobile() &&
            React.createElement("div", { style: { height: height }, className: "".concat(detectMobile() ? 'room-client' : 'room-web') }, showBackLogo &&
                React.createElement("img", { src: "https://heras.igengmei.com/b1076ea9-9366-4d75-8d68-7ec29cd96b3e-1677051145150", alt: "", className: 'collapse-logo back-logo', onClick: function () { setShowChatRoom(false); } }))));
}
export default Chat;
