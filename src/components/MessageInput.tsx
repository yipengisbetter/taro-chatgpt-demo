import { Input, View, Image } from "@tarojs/components";
import sendIcon from '@/images/send.svg';
import { useState } from "react";

type MessageInputProp = {
  onSendMessage: (message: string) => void
}
export function MessageInput({onSendMessage}: MessageInputProp) {
  const [userInput, setUserInput] = useState<string>("")
  return <View className='message-input'>
    <View className='input-container'>
      <Input className='text-input' placeholder='请输入您的问题' value={userInput} onInput={(event) => setUserInput(event.detail.value)} />
      <View className='send-btn' onClick={() => {
        onSendMessage(userInput)
        setUserInput("")
      }}
      >
        <Image className='icon' src={sendIcon} />
        <View className='txt'>发送</View>
      </View>
    </View>
  </View>
}