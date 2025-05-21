import { aiService } from './ai.service'

async function createTicket(question) {
    try {
        // First, get AI response
        const { response, shouldEscalate } = await aiService.getAIResponse(question)
        
        // Create ticket object
        const ticket = {
            id: Date.now(),
            question,
            aiResponse: response,
            status: shouldEscalate ? 'escalated' : 'resolved',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
        tickets.push(ticket)
        localStorage.setItem('tickets', JSON.stringify(tickets))

        return {
            ticket,
            aiResponse: response,
            shouldEscalate
        }
    } catch (error) {
        console.error('Ticket Service Error:', error)
        throw error
    }
}

export const ticketService = {
    createTicket
} 

// import { httpService } from './http.service'

// async function createTicket(question) {
//     try {
//         const response = await httpService.post('ticket', { question })
//         return {
//             ticket: response.ticket,
//             aiResponse: response.aiResponse,
//             shouldEscalate: response.shouldEscalate
//         }
//     } catch (error) {
//         console.error('Failed to create ticket:', error)
//         throw error
//     }
// }

// async function getTickets(filter = 'all') {
//     try {
//         const queryParams = filter !== 'all' ? `?status=${filter}` : ''
//         const tickets = await httpService.get(`ticket${queryParams}`)
//         return tickets
//     } catch (error) {
//         console.error('Failed to get tickets:', error)
//         throw error
//     }
// }

// async function updateTicket(ticketId, update) {
//     try {
//         const updatedTicket = await httpService.put(`ticket/${ticketId}`, update)
//         return updatedTicket
//     } catch (error) {
//         console.error('Failed to update ticket:', error)
//         throw error
//     }
// }

// export const ticketService = {
//     createTicket,
//     getTickets,
//     updateTicket
// }