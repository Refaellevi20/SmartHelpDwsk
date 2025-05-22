import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginModal } from '../hooks/useLoginModal'
import { useSelector } from 'react-redux'
import { TicketCreate } from '../cmps/TicketCreate'
import { AppHeader } from '../cmps/AppHeader'

export function HomePage() {
    const navigate = useNavigate()
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
    const user = useSelector((state) => state.userModule.user)
    const { LoginModal, openLoginModal, closeLoginModal } = useLoginModal()

    useEffect(() => {
        // Check for both admin and regular user login
        const loggedInUser = localStorage.getItem('loggedinUser')
        if (!loggedInUser && !user) {
            // If neither admin nor regular user is logged in, redirect to login page
            navigate('/login')
            return
        }
    }, [user, navigate])

    // Don't render homepage content if not logged in
    const getUserData = () => {
        if (user) return user
        try {
            const loggedInUser = localStorage.getItem('loggedinUser')
            return loggedInUser ? JSON.parse(loggedInUser) : null
        } catch (err) {
            console.error('Error parsing user data:', err)
            return null
        }
    }

    const userData = getUserData()

    // Don't render homepage content if not logged in
    if (!userData) {
        navigate('/login')
        return null
    }

    return (
        <div className="home-page">
            <AppHeader />
            <h1>Home Page</h1>
            <p>Welcome to the home page</p>
            {userData?.fullname && <h3>User: {userData.fullname}</h3>}
            <LoginModal />

            <main className="main-content">
                <TicketCreate />
            </main>

        </div>
    )
}
