export const submitFunction = () => {
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
}