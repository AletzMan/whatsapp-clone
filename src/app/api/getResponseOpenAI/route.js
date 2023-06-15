import { NextResponse } from "next/server"
import {
    Configuration,
    ChatCompletionRequestMessageRoleEnum,
    OpenAIApi
} from 'openai'




const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    headers: {
        "Content-Type": "application/json",
    }
})
const openai = new OpenAIApi(configuration)


const date = new Date()
const currentDate = `${date.getFullYear()}-${date.getMonth() + 1
    }-${date.getDate()}`






export async function GET(req, res) {
    // if (req.method !== 'GET') return res.status(405).end()

    const { searchParams } = new URL(req.url)
    const prompt = searchParams.get('prompt')
    const person = searchParams.get('person')
    const encodePrompt = encodeURIComponent(prompt)
    const encodePerson = encodeURIComponent(person)

    const ROL_CONTENT = `You are ${encodePerson}, answer the questions as if you were ${encodePerson}, don't be so formal,
    and be nice, do not answer saying I am ${encodePerson}, if not always speak in the first person, if they greet you, greet you too, if not answer only what they ask you.
    what you are asked. Always answer as ${encodePerson}, don't say you are an artificial intelligence. Answer in Spanish. The current date is: ${currentDate}.`

    const INITIAL_ROLE_MESSAGE = [{
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: ROL_CONTENT
    }]

    console.log('server' + prompt)
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' })
    }
    //const apiKEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            temperature: 0,
            messages: [
                ...INITIAL_ROLE_MESSAGE,
                {
                    role: ChatCompletionRequestMessageRoleEnum.User,
                    content: encodePrompt
                }
            ]
        })
        //console.log(response)
        if (!response.status != 200) {
            console.error(response.statusText)
            //return res.status(500).json({ error: 'OpenAI API error' })
        }
        const data = response.data ?? ''
        console.log(data)
        let jsonString = JSON.stringify(data)
        let json = JSON.parse(jsonString)
        return NextResponse.json(json)
        //return data.choices[0].text
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e })
    }
}
