import { Image, View } from "@tarojs/components";
import backIcon from '@/images/back.svg';
import shareIcon from '@/images/share.svg';

type HeaderProp = {
  title: string;
  chatNum: number;
  onBack?: () => void;
  onShare?: () => void;
}

export function Header({ title, chatNum, onBack = () => {}, onShare = () => {} }: HeaderProp) {
  return <View className='header-container'>
    <View className='btn' onClick={onBack}>
      <Image className='icon' src={backIcon} />
    </View>
    <View className='title'>
      <View className='text'>{title}</View>
      <View className='num'>共{chatNum}条对话</View>
    </View>
    <View className='btn' onClick={onShare}>
      <Image className='icon' src={shareIcon} />
    </View>
  </View>
}