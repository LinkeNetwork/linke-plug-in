import React, { useEffect, useState, useRef } from 'react'
import { detectMobile } from '../../utils/index'
import RoomInfo from './RoomInfo'
interface Window {
  location: any
  open(arg0: string, arg1: string): unknown
  localStorage: any
  ethereum: any;
}
declare let window: Window;
function Chat(props: any) {
  const [showBackLogo, setShowBackLogo] = useState(false)
  const _iframe = useRef<HTMLIFrameElement>(null)
  const { roomAddress } = props
  const [showChatRoom, setShowChatRoom] = useState(false)
  const [isCollapse, setIsCollapse] = useState(false)
  const [height, setHeight] = useState('100vh')
  const handleShowChat = () => {
    if(detectMobile()) {
      window.open(`https://www.linke.network/chat/${roomAddress}/ETHF?share=1`, '_self')
    }
    setShowChatRoom(true)  
  }
  const handleCollapse = () => {
    setShowChatRoom(false)
    setIsCollapse(!isCollapse)
  }
  const _iframeOnload = () => {
    setShowBackLogo(true)
  }
  useEffect(() => {
    if(window.location.host !== 'www.linke.network' && detectMobile()) {
      setShowChatRoom(false)
    }
  }, [window.location])
  return (
    <div className='chat-container'>
      {
        !showChatRoom && detectMobile() &&
        <div className='logo-wrapper' onClick={handleShowChat}>
          <img src='https://www.linke.network/static/media/linke-logo.2e01f3e1ebbda0b13015e89c5e1357be.svg' />
        </div>
      }
      {
        !detectMobile() &&
        <div className={`chat-box ${showChatRoom ? 'collapse-height' : ''}`}>
          <div className={`chat-item ${isCollapse ? 'chat-item-collapse' : ''}`}>
            <div className='top-info'>
              {
                !showChatRoom 
                ? <div className='title'>Messages</div>
                : <img src="https://linkenetwork.s3.us-east-2.amazonaws.com/back.svg" alt="" className='back-logo' onClick={() => { setShowChatRoom(false) }} />
              }
              <img src="https://linkenetwork.s3.us-east-2.amazonaws.com/collapse.svg" alt="" className='collapse-logo' onClick={handleCollapse} />
            </div>
            {
              !showChatRoom && <RoomInfo roomAddress={roomAddress} handleShowChat={() => { setShowChatRoom(true) }} />
            }

            {
              showChatRoom &&
              <iframe
                id="iframe"
                ref={_iframe}
                onLoad={_iframeOnload}
                src={`https://www.linke.network/chat/${roomAddress}/ETHF?share=1`}
                width="100%"
                height="100%"
                frameBorder="0"
              >
              </iframe>
            }
          </div>
        </div>
      }
      {
        showChatRoom && detectMobile() &&
        <div style={{ height: height }} className={`${detectMobile() ? 'room-client' : 'room-web'}`}>
          {
            showBackLogo &&
            <img src="https://linkenetwork.s3.us-east-2.amazonaws.com/collapse.svg" alt="" className='collapse-logo back-logo' onClick={() => { setShowChatRoom(false) }} />
          }
        </div>
      }
    </div>

  )
}

export default Chat;