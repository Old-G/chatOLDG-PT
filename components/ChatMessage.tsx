import { Flex, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'

type ChatMessageProps = {
  message: string
  user: string
}

const ChatMessage = ({ message, user }: ChatMessageProps) => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      w='full'
      align='center'
      bgColor={user !== 'oldg-pt' ? 'gray.300' : undefined}
      // border='1px solid'
      p='15px'
      borderRadius={8}
    >
      <Text color='blue.400' w='80px' mr='10px'>
        {user || 'oldg-pt'}
      </Text>
      <Text
        color={
          colorMode === 'dark' && user === 'oldg-pt' ? 'white' : 'gray.900'
        }
        w='full'
      >
        {message}
      </Text>
    </Flex>
  )
}

export default ChatMessage
