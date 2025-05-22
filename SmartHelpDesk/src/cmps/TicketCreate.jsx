import { useState } from 'react'
import { ticketService } from '../services/ticket.service'

export function TicketCreate() {
    const [question, setQuestion] = useState('')
    const [response, setResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!question.trim()) return
        
        setIsLoading(true)
        setError(null)
        
        try {
            const result = await ticketService.createTicket(question)
            setResponse(result)
            // Only show escalation message if explicitly needed
            if (result.shouldEscalate && result.aiResponse.includes('ESCALATE')) {
                setError('This query requires human assistance. A support agent will contact you soon.')
            }
            setQuestion('')
        } catch (err) {
            setError('Failed to process your request. Please try again.')
            console.error('Ticket creation failed:', err)
        } finally {
            setIsLoading(false)
        }
    } 

    return (
        <div className="ticket-create">
            <h2>How can we help you today?</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Describe your issue..."
                    rows="4"
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Submit'}
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}
            
            {response && !error && (
                <div className="response-section">
                    <h3>Response:</h3>
                    <p>{response.aiResponse}</p>
                    {!response.shouldEscalate && (
                        <button onClick={() => setResponse(null)}>Ask Another Question</button>
                    )}
                </div>
            )}
        </div>
    )
} 