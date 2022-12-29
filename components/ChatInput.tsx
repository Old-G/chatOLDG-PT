import { FormControl, Flex, Input, Button } from '@chakra-ui/react'
import React, { SetStateAction, useCallback } from 'react'

type ChatInputProps = {
  input: string
  setInput: (value: string) => void
  chatLog: {
    user: string
    message: string
  }[]
  setChatLog: (value: any) => void
  name: string | null
}

const ChatInput = ({
  input,
  setInput,
  chatLog,
  setChatLog,
  name,
}: ChatInputProps) => {
  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      let chatLogNew = [...chatLog, { user: name || 'me', message: `${input}` }]

      setInput('')
      setChatLog(chatLogNew)

      try {
        const messages = chatLogNew
          ?.map((message: { message: string }) => message.message)
          .join('\n')

        const response = await fetch('/api/openaiApi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: messages,
          }),
        })

        const data = await response.json()
        setChatLog([...chatLogNew, { user: 'oldg-pt', message: data?.message }])

        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          )
        }
      } catch (error: any) {
        // Consider implementing your own error handling logic here
        console.error(error)
        alert(error.message)
      }
    },
    [chatLog, input, name, setChatLog, setInput]
  )

  const handleKeydown = useCallback(
    async (event: { key: string }) => {
      if (event.key === 'Enter') {
        let chatLogNew = [
          ...chatLog,
          { user: name || 'me', message: `${input}` },
        ]

        setInput('')
        setChatLog(chatLogNew)

        try {
          const messages = chatLogNew
            ?.map((message: { message: string }) => message.message)
            .join('\n')

          const response = await fetch('/api/openaiApi', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: messages,
            }),
          })

          const data = await response.json()
          setChatLog([
            ...chatLogNew,
            { user: 'oldg-pt', message: data?.message },
          ])

          if (response.status !== 200) {
            throw (
              data.error ||
              new Error(`Request failed with status ${response.status}`)
            )
          }
        } catch (error: any) {
          // Consider implementing your own error handling logic here
          console.error(error)
          alert(error.message)
        }
      }
    },
    [chatLog, input, name, setChatLog, setInput]
  )

  return (
    <FormControl pb='20px' bottom='20px' maxW='1200px'>
      <Flex align='center'>
        <Input
          type='text'
          onChange={(e) => setInput(e.target.value)}
          value={input}
          mr='10px'
          onKeyDown={handleKeydown}
          bgColor='gray.600'
          p='25px'
          color='gray.200'
        />
        <Button
          onClick={handleSubmit}
          bgColor='gray.600'
          color='white'
          p='25px'
          _hover={{ color: 'gray.800' }}
        >
          Send
        </Button>
      </Flex>
    </FormControl>
  )
}

export default ChatInput
