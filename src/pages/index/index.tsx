import { Image, View } from '@tarojs/components'
import Taro, { useDidShow, useLoad } from '@tarojs/taro'
import addIcon from '@/images/add.svg'
import { useEffect, useState } from 'react'
import { Message } from '@/components/ChatList'

export default function Index () {

  useLoad(() => {
    console.log('Page loaded.')
  })
  useDidShow(async () => {
    const { data } = await Taro.getStorage({ key: "session-map" }).catch(() => ({ data: '{}' }))
    setSessionMap(JSON.parse(data))
  })
  function handleNewChat() {
    const maxId = Math.max(...Object.keys(sessionMap).map(i => +i)) || 0
    const nextId = maxId < 0 ? 1 : maxId + 1
    Taro.navigateTo({url: `/pages/chat/chat?id=${nextId}`})
  }
  const [sessionMap, setSessionMap] = useState<Record<string, Message[]>>({})
  useEffect(() => {
    (async () => {
      const { data } = await Taro.getStorage({ key: "session-map" }).catch(() => ({ data: '{}' }))
      setSessionMap(JSON.parse(data))
    })()
  },[])

  return <View className='index-page'>
    <View className='header'>
      <View className='title'>ChatGPT Next</View>
      <View className='desc'>Build your own AI assistant</View>
    </View>
    <View className='session-list'>
      {Object.keys(sessionMap).map(id =>
        <View className='session-item' onClick={() => {
          Taro.navigateTo({ url: `/pages/chat/chat?id=${id}` })
        }}>
          <View className='title'>
            新的对话
          </View>
          <View className='chat-num'>
            {sessionMap[id].length} 条对话
          </View>
        </View>
      )}
    </View>
    <View className='footer'>
      <View className='btn'
        onClick={handleNewChat}
      >
        <Image className='icon' src={addIcon} />
        <View className='txt'>新的聊天</View>
      </View>
    </View>
  </View>
}
