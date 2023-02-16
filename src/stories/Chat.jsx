import React from 'react'
import PropTypes from 'prop-types';

export const Chat = ({roomAddress, chatHeight, ...props}) => {
  return (
    <div style={{height: chatHeight}} {...props}>
      <iframe
          src={`https://linke.network/chat/${roomAddress}/ETHF?share=1`}
          width="100%"
          height="100%"
          frameBorder="0"
        >
      </iframe>
    </div>
  );
}
Chat.propTypes = {
  roomAddress: PropTypes.string,
  chatHeight: PropTypes.string,
};
