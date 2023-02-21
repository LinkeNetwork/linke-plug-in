import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from 'web3'
import { detectMobile } from '../../utils/index'
import collapseLogo from '../../assets/images/collapse.svg'
import backLogo from '../../assets/images/back.svg'
import RoomInfo from './RoomInfo'
import './_style.scss'
interface Window {
  localStorage: any
  ethereum: any;
}
declare let window: Window;
function Chat(props: any) {
  const [loading, setLoading] = useState(false)
  const _iframe = useRef<HTMLIFrameElement>(null)
  const { roomAddress, chatHeight } = props
  const history = useHistory()
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
    const web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    const account = await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
    window.localStorage.setItem('account', account[0])
  }
  useEffect(() => {
    getAccount()
  }, [])
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
              {
                !showChatRoom 
                ? <div className='title'>Messages</div>
                : <img src={backLogo} alt="" className='collapse-logo back-logo' onClick={() => { setShowChatRoom(false) }} />
              }
              <img src={collapseLogo} alt="" className='collapse-logo' onClick={handleCollapse} />
            </div>
            {
              !showChatRoom && <RoomInfo roomAddress={address} handleShowChat={() => { setShowChatRoom(true) }} />
            }

            {
              showChatRoom &&
              <iframe
                id="iframe"
                ref={_iframe}
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
          <img src={backLogo} alt="" className='collapse-logo back-logo' onClick={() => { setShowChatRoom(false) }} />
          <iframe
            id="iframe"
            ref={_iframe}
            src={`https://www.linke.network/chat/${address}/ETHF?share=1`}
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