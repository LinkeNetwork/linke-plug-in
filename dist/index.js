import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Chat from "./components/chat/index";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(BrowserRouter, null,
        React.createElement(Chat, null))), document.getElementById('root'));
reportWebVitals();
// export { default as Chat } from "./components/chat"
