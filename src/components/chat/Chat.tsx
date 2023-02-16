import React, { useEffect, useState } from 'react'
import { detectMobile } from '../../utils/index'
import collapseLogo from '../../assets/images/collapse.svg'
import RoomInfo from './RoomInfo'
import './_style.scss'
function Chat(props: any) {
  const { roomAddress, chatHeight } = props
  const [showChatRoom, setShowChatRoom] = useState(false)
  const [isCollapse, setIsCollapse] = useState(false)
  const [height, setHeight] = useState('100vh')
  const [address, setAddress] = useState('0xbe0acae9883e5e47c012c79241af84959010e9c3')
  const handleShowChat = () => {
    setShowChatRoom(true)
  }
  const handleCollapse = () => {
    setIsCollapse(!isCollapse)
  }
  const getAccount = async() => {
    const account = await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
    window.localStorage.setItem('account', account[0])
    console.log(account)
  }
  useEffect(() => {
    if (chatHeight) {
      setHeight(height)
    }
    getAccount()
  }, [chatHeight])
  useEffect(() => {
    if (roomAddress) {
      setAddress(roomAddress)
    }
  }, [roomAddress])
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
        <div className='chat-box'>
          <div className={`chat-item ${isCollapse ? 'chat-item-collapse' : ''}`}>
            <div className='top-info'>
              <div className='title'>Messages</div>
              <img src={collapseLogo} alt="" className='collapse-logo' onClick={handleCollapse} />
            </div>
            {
              !showChatRoom && <RoomInfo roomAddress={address} handleShowChat={() => { setShowChatRoom(true) }} />
            }

            {
              showChatRoom &&
              <iframe
                src={`https://linke.network/chat/${address}/ETHF?share=1`}
                width="100%"
                height="100%"
                frameBorder="0"
              >
              </iframe>
            }

            {
              showChatRoom && detectMobile() &&
              <div style={{ height: height, overflow: 'hidden' }} className={`${detectMobile() ? 'room-client' : 'room-web'}`}>
                <iframe
                  src={`https://linke.network/chat/${address}/ETHF?share=1`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                >
                </iframe>
              </div>
            }
          </div>
        </div>
      }
      {
        showChatRoom && detectMobile() &&
        <div style={{ height: height }} className={`${detectMobile() ? 'room-client' : 'room-web'}`}>
          <iframe
            src={`https://linke.network/chat/${address}/ETHF?share=1`}
            width="100%"
            height="100%"
            frameBorder="0"
          >
          </iframe>
        </div>
      }
    </div>

  )
}

export default Chat;