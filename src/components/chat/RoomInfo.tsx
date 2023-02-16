import React, { useEffect, useState } from 'react'
import { createClient } from 'urql'
import './_style.scss'
function RoomInfo(props: any) {
  const { roomAddress, handleShowChat } = props
  interface IRoomInfo {
    avatar: string;
    name: string;
  }
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>({avatar: '', name: ''})
  const getCurrentGroupInfo = async () => {
    const tokensQuery = `
      query{
        groupInfo(id: "`+ roomAddress?.toLowerCase() + `"){
          id,
          description,
          name,
          avatar,
          userCount,
          chatCount,
          style,
          _type,
        }
      }
    `
    const client = createClient({
      url: 'https://graph.etherfair.org/subgraphs/name/LinkeNetwork/linke-network-subgraph'
    })
    const res = await client.query(tokensQuery, {}).toPromise()
    setRoomInfo(res?.data?.groupInfo)
  }
  useEffect(() => {
    getCurrentGroupInfo()
  }, [])
  return (
    <div className='info-container' onClick={handleShowChat}>
      <img src={roomInfo?.avatar} alt=""/>
      <span className='name'>{roomInfo?.name}</span>
    </div>
    
  )
}

export default RoomInfo;