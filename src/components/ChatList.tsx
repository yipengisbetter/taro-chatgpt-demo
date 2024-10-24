import { View } from "@tarojs/components"
import { Markdown } from "./Markdown"

export type Message = {
  role: "user" | "assistant"
  content: string
}
type ChatListProp = {
  messageList: Message[]
}

export function ChatList({ messageList }: ChatListProp) {
  return <View className='chat-list'>
    {
      messageList.map(i => 
        <View className={`message ${i.role}`} key={i.content + i.role}>
          <View className='txt'>
            <Markdown content={i.content} />
          </View>
        </View>   
      )
    }
  </View>
}
