import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useCallback, useState } from 'react'
import { Button, Flex, FormControl, Input, Text } from '@chakra-ui/react'

export default function Home() {
  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState([
    {
      user: 'gpt',
      message: 'Hello, how I can help you today?',
    },
    {
      user: 'me',
      message: 'I want to use ChatGPT today.',
    },
  ])

  console.log(chatLog)

  const handleClearChat = useCallback(() => {
    setChatLog([
      {
        user: 'gpt',
        message: 'Hello, how I can help you today?',
      },
      {
        user: 'me',
        message: 'I want to use ChatGPT today.',
      },
    ])
  }, [])

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      let chatLogNew = [...chatLog, { user: 'me', message: `${input}` }]

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
        setChatLog([...chatLogNew, { user: 'gpt', message: data?.message }])

        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          )
        }
      } catch (error: any) {
        // Consider implementing your own error handling logic here
        console.error(error)
        // alert(error.message)
      }
    },
    [chatLog, input]
  )

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Button onClick={handleClearChat}>New Chat</Button>
        <Flex direction='column' align='left' maxW='900px'>
          {chatLog?.map(({ message, user }, idx) => (
            <Flex key={idx} align='center' mb='15px'>
              <Text color='blue.400' mr='10px'>
                {user || 'chatGPT'}
              </Text>
              <Text color='gray.700'>{message}</Text>
            </Flex>
          ))}
        </Flex>

        <FormControl>
          <Input
            type='text'
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button onClick={handleSubmit}>Send</Button>
        </FormControl>
      </main>
    </>
  )
}
