import { View } from "@tarojs/components";

type MarkdownProp = {
  content: string;
}

export function Markdown({ content }: MarkdownProp) {

  const lines = content.split("\n")

  const jsx = lines.map(line => {
    const h1 = line.match(/^\s*#\s+([\s\S]+)$/)
    if (h1) {
      return <View className='h1'>{h1[1]}</View>
    }
    const h2 = line.match(/^\s*##\s+([\s\S]+)$/)
    if (h2) {
      return <View className='h2'>{h2[1]}</View>
    }
    const h3 = line.match(/^\s*###\s+([\s\S]+)$/)
    if (h3) {
      return <View className='h3'>{h3[1]}</View>
    }
    const listItem = line.match(/^\s*-\s+([\s\S]+)$/)
    if (listItem) {
      return <View className='list-item'>{listItem[1]}</View>
    }
    return <View className='txt'>{line}</View>
  })
  return <View className='markdown'>{jsx}</View>
}
