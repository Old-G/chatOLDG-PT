// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// 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

type Data = {
  message: string
  status?: string
}

const openaiApiKey = 'YOUR_API_KEY_HERE'
const text = 'Hello, how are you today?'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  } else {
    try {
      fetch('https://api.openai.com/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: text,
          max_tokens: 100,
          temperature: 1,
        }), 
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // Success! Parse the response and use it in your app
          const generatedText = responseJson.data
          console.log(generatedText)
        })
    } catch (error) {
      console.error(error)
      res.status(405).json({
        status: 'failure',
        message: 'Error submitting the enquiry form',
      })
    }
  }
}
