import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

type ChatMessageProps = {
  message: string
  user: string
}

const ChatMessage = ({ message, user }: ChatMessageProps) => {
  return (
    <Flex
      w='full'
      align='center'
      bgColor={user !== 'oldg-pt' ? 'gray.300' : undefined}
      // border='1px solid'
      p='15px'
      borderRadius={8}
    >
      <Text color='blue.500' w='80px' mr='10px'>
        {user || 'oldg-pt'}
      </Text>
      <Text w='full'>{message}</Text>
    </Flex>
  )
}

export default ChatMessage
