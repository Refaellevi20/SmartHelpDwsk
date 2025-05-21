import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Only for development
})

async function getAIResponse(userQuestion) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful customer support assistant. Provide clear, concise answers. If you're not confident about the answer, respond with 'ESCALATE' to transfer to a human agent."
                },
                {
                    role: "user",
                    content: userQuestion
                }
            ],
            model: "gpt-3.5-turbo",
        })

        const aiResponse = completion.choices[0].message.content
        
        // Check if response indicates uncertainty
        const uncertaintyKeywords = ['not sure', 'cannot help', 'don\'t know', 'unclear', 'ESCALATE']
        const shouldEscalate = uncertaintyKeywords.some(keyword => 
            aiResponse.toLowerCase().includes(keyword.toLowerCase())
        )

        return {
            response: aiResponse,
            shouldEscalate
        }
    } catch (error) {
        console.error('AI Service Error:', error)
        return {
            response: 'Sorry, I encountered an error. Let me transfer you to a human agent.',
            shouldEscalate: true
        }
    }
}

export const aiService = {
    getAIResponse
} 