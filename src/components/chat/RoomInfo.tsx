import React, { useEffect, useState } from 'react'
import { createClient } from 'urql'
import { Jazzicon } from '@ukstv/jazzicon-react'
// import '../../styles/index.scss'
function RoomInfo(props: any) {
  const { roomAddress, handleShowChat } = props
  interface IRoomInfo {
    id: string;
    name: string;
  }
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>({id: '', name: ''})
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
      {
        roomInfo?.id &&
        <Jazzicon address={roomInfo?.id} className="room-icon" />
      }
     
      <span className='name'>{roomInfo?.name}</span>
    </div>
    
  )
}

export default RoomInfo;