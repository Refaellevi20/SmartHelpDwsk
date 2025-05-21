import { useState, useEffect } from 'react'
import { ticketService } from '../../../src/services/ticket.service'

export function AdminDashboard() {
    const [tickets, setTickets] = useState([])
    const [filter, setFilter] = useState('all') // all, escalated, resolved
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadTickets()
    }, [filter])

    async function loadTickets() {
        try {
            setIsLoading(true)
            const fetchedTickets = await ticketService.getTickets(filter)
            setTickets(fetchedTickets)
        } catch (err) {
            console.error('Failed to load tickets:', err)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleUpdateTicket(ticketId, status, adminResponse) {
        try {
            await ticketService.updateTicket(ticketId, { status, adminResponse })
            loadTickets()
        } catch (err) {
            console.error('Failed to update ticket:', err)
        }
    }

    return (
        <div className="admin-dashboard">
            <h2>Support Tickets Dashboard</h2>
            
            <div className="filter-controls">
                <button 
                    className={filter === 'all' ? 'active' : ''} 
                    onClick={() => setFilter('all')}
                >
                    All Tickets
                </button>
                <button 
                    className={filter === 'escalated' ? 'active' : ''} 
                    onClick={() => setFilter('escalated')}
                >
                    Escalated
                </button>
                <button 
                    className={filter === 'resolved' ? 'active' : ''} 
                    onClick={() => setFilter('resolved')}
                >
                    Resolved
                </button>
            </div>

            {isLoading ? (
                <div className="loading">Loading tickets...</div>
            ) : (
                <div className="tickets-list">
                    {tickets.map(ticket => (
                        <TicketCard 
                            key={ticket._id} 
                            ticket={ticket}
                            onUpdate={handleUpdateTicket}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function TicketCard({ ticket, onUpdate }) {
    const [isReplying, setIsReplying] = useState(false)
    const [response, setResponse] = useState('')

    async function handleSubmitResponse(ev) {
        ev.preventDefault()
        await onUpdate(ticket._id, 'resolved', response)
        setIsReplying(false)
        setResponse('')
    }

    return (
        <div className={`ticket-card ${ticket.status}`}>
            <div className="ticket-header">
                <span className="ticket-id">#{ticket._id.slice(-6)}</span>
                <span className={`status ${ticket.status}`}>
                    {ticket.status}
                </span>
            </div>
            
            <div className="ticket-content">
                <p className="question">{ticket.question}</p>
                <p className="ai-response">AI Response: {ticket.aiResponse}</p>
                
                {ticket.adminResponse && (
                    <p className="admin-response">
                        Admin Response: {ticket.adminResponse}
                    </p>
                )}
            </div>

            {ticket.status === 'escalated' && !isReplying && (
                <button onClick={() => setIsReplying(true)}>
                    Respond to Ticket
                </button>
            )}

            {isReplying && (
                <form onSubmit={handleSubmitResponse}>
                    <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Type your response..."
                        required
                    />
                    <div className="form-actions">
                        <button type="submit">Send Response</button>
                        <button 
                            type="button" 
                            onClick={() => setIsReplying(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
} 