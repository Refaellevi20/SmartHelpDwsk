import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminLogin } from '../cmps/AdminLogin'
import { UserLogin } from '../cmps/UserLogin'
import levixLogo from '../assets/imgs/levix.png'
import { GoogleLogin } from '../cmps/GoogleLogin'

export function LoginPage() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        // Check if user is already logged in
        const loggedInUser = localStorage.getItem('loggedinUser')
        if (loggedInUser) {
            // If already logged in, redirect to home
            navigate('/login')
        }
    }, [navigate])

    const onLoginSuccess = () => {
        navigate('/')
    }

    return (
        <div className='login-page'>
            <div className="login-container">
                <div className="company-info">
                    <div className="company-logo">
                        <img src={levixLogo} alt="Levix Logo" />
                    </div>
                    <div className="company-description">
                        <h2>Welcome to helpdesk</h2>
                        <p>SmartHelp is an intelligent helpdesk platform that combines smart automation with real human support to help businesses respond faster, smarter, and better.</p>
                        <ul className="company-highlights">
                            <li>✓ Enterprise Solutions</li>
                            <li>✓ Digital Innovation</li>
                            <li>✓ Human + AI Support</li>
                        </ul>
                    </div>
                </div>
                <div className="auth-section">
                    {/* <AdminLogin onSuccess={onLoginSuccess} /> */}
                    <UserLogin closeModal={() => setIsModalOpen(false)} onSuccess={onLoginSuccess} />
                    <GoogleLogin onSuccess={onLoginSuccess} />
                </div>
            </div>
        </div>
    )
} 