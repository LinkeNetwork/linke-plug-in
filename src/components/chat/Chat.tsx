import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom"
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
  const history = useHistory()
  const [showBackLogo, setShowBackLogo] = useState(false)
  const _iframe = useRef<HTMLIFrameElement>(null)
  const { roomAddress, chatHeight } = props
  const [showChatRoom, setShowChatRoom] = useState(false)
  const [isCollapse, setIsCollapse] = useState(false)
  const [height, setHeight] = useState('100vh')
  const [address, setAddress] = useState('0xbe0acae9883e5e47c012c79241af84959010e9c3')
  const handleShowChat = () => {
    if(detectMobile()) {
      window.open(`https://www.linke.network/chat/${address}/ETHF?share=1`, '_self')
    }
    setShowChatRoom(true)  
  }
  const handleCollapse = () => {
    setIsCollapse(!isCollapse)
  }
  const _iframeOnload = () => {
    setShowBackLogo(true)
  }
  useEffect(() => {
    if (chatHeight) {
      setHeight(height)
    }
  }, [chatHeight])
  useEffect(() => {
    if (roomAddress) {
      setAddress(roomAddress)
    }
  }, [roomAddress])
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
                : <img src="https://heras.igengmei.com/44e88af1-a8ad-4933-9585-478971f02202-1677051124153" alt="" className='collapse-logo back-logo' onClick={() => { setShowChatRoom(false) }} />
              }
              <img src="https://heras.igengmei.com/b1076ea9-9366-4d75-8d68-7ec29cd96b3e-1677051145150" alt="" className='collapse-logo' onClick={handleCollapse} />
            </div>
            {
              !showChatRoom && <RoomInfo roomAddress={address} handleShowChat={() => { setShowChatRoom(true) }} />
            }

            {
              showChatRoom &&
              <iframe
                id="iframe"
                ref={_iframe}
                onLoad={_iframeOnload}
                src={`https://www.linke.network/chat/${address}/ETHF?share=1`}
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
            <img src="https://heras.igengmei.com/b1076ea9-9366-4d75-8d68-7ec29cd96b3e-1677051145150" alt="" className='collapse-logo back-logo' onClick={() => { setShowChatRoom(false) }} />
          }
          {/* <iframe
            id="iframe"
            ref={_iframe}
            onLoad={_iframeOnload}
            src={`http://172.30.8.71:3000/chat/${address}/ETHF?share=1`}
            width="100%"
            height="100%"
            frameBorder="0"
          >
          </iframe> */}
        </div>
      }
    </div>

  )
}

export default Chat;