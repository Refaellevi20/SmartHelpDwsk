import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'
import { BtnSquareColorRed } from './buttons ui/btn-square-color'

export function AdminLogin({ onSuccess }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        try {
            const user = await authService.login(credentials)
            localStorage.setItem('loggedinUser', JSON.stringify(user))
            onSuccess?.()
        } catch (err) {
            setError('התחברות נכשלה. אנא בדקו את פרטי ההתחברות.')
        }
    }

    return (
        <div className="login-page-email " style={{ padding: '48px' }}>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group-email login-form">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group-email login-form" style={{ marginTop: '16px' }}>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <BtnSquareColorRed className="login-btn submit" style={{ marginTop: '1em' }}>Login</BtnSquareColorRed>
            </form>
        </div>
    )
} 