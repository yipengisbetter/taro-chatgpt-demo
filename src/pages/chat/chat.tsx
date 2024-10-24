import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { Header } from '@/components/Header'
import { ChatList, Message } from '@/components/ChatList'
import { MessageInput } from '@/components/MessageInput'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const router = useRouter()
  const id = router.params.id!
  useEffect(() => {
    (async () => {
      const { data: sessionMapJson } = await Taro.getStorage({ key: "session-map" }).catch(() => ({ data: '{}' }))
      const sessionMap = JSON.parse(sessionMapJson)
      if (sessionMap[id]) {
        setMessageList(sessionMap[id])
      }
    })()
  }, [])
  const [messageList, setMessageList] = useState<Message[]>([]);

  async function handleSendMessage(msg: string) {
    const newMessageList = [
      ...messageList,
      { role: "user" as const, content: msg }
    ];
    setMessageList(newMessageList);

    const { data } = await Taro.request({
      url: "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie_speed?access_token=24.336aea537d19a1ca4620dca2905ca2b3.2592000.1731853048.282335-115921357",
      method: "POST",
      header: {
        "content-type": "application/json", // 默认值
      },
      data: { messages: newMessageList }
    })
    const repliedMessageList = [
      ...newMessageList,
      { role: "assistant" as const, content: data.result }
    ];
    setMessageList(repliedMessageList)
    const { data: sessionMapJson } = await Taro.getStorage({ key: "session-map" }).catch(() => ({ data: '{}' }))
    const sessionMap = JSON.parse(sessionMapJson)
    sessionMap[id] = repliedMessageList;
    Taro.setStorage({ key: "session-map", data: JSON.stringify(sessionMap) })
  }

  return (
    <View className='chat-page'>
      <Header title='新的聊天' chatNum={messageList.length} onBack={() => Taro.navigateBack()} />
      <ChatList messageList={messageList} />
      <MessageInput onSendMessage={handleSendMessage} />
    </View>
  )
}
