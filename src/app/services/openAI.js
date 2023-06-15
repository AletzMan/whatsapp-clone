export async function GetResponseOpenAI(text, person) {
    try {
        const res = await fetch(`/api/getResponseOpenAI?prompt=${text}&person=${person}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //console.log(res)
        const data = await res.json()
        //console.log(data.choices)
        return data?.choices[0]?.message?.content
    } catch (error) {
        console.error(error)
    }

}