import { useState } from 'react'
import { userService } from '../services/user/user.service.local'
import { ImgUploader } from './ImgUploader'
import { showSuccessMsg } from '../services/event-bus.service'
import { login, signup } from '../store/user/user.actions'
import { BtnSquareColorRed } from './buttons ui/btn-square-color'
import { BtnGestColor } from './buttons ui/btn-gest-color'
import { BtnHostColor } from './buttons ui/btn-host-color'

export function UserLogin({ closeModal, onSuccess }) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullname: '',
    })
    const [isSignup, setIsSignup] = useState(false)

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            closeModal()
            clearState()
            onSuccess?.()
        } catch (err) {
            console.error('Login failed:', err)
        }
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname)
            return
        try {
            if (!credentials.imgUrl) {
                credentials.imgUrl = 'https://robohash.org/mat.png?size=50x50&set=set4'
            }
            const user = await signup(credentials)
            localStorage.setItem('loggedinUser', JSON.stringify(user))
            showSuccessMsg(`Welcome: ${user.fullname}`)
            closeModal?.()
            clearState()
            onSuccess?.()
        } catch (err) {
            console.error('Signup failed:', err)
        }
    }
    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="auth-section">
            {!isSignup ? (
                <form className='login-form' onSubmit={onLogin}>
                    <h3>Sign In</h3>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        minLength="3"
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        minLength="3"
                    />
                    <BtnSquareColorRed className="login-btn">Login</BtnSquareColorRed>
                </form>
            ) : (
                <form className='signup-form' onSubmit={onSignup}>
                    <h3>Create Account</h3>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Fullname"
                        onChange={handleChange}
                        required
                        minLength="3"
                    />
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        minLength="3"
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        minLength="3"
                    />
                    <ImgUploader onUploaded={onUploaded} />
                    <BtnSquareColorRed className='sing-up'>Signup!</BtnSquareColorRed>
                </form>
            )}
            <div className='demo-login-btns'>
                <BtnHostColor onClick={() => {
                    credentials.username = 'host'
                    onLogin()
                }}>
                    Demo: Login as Host
                </BtnHostColor>
                <BtnGestColor onClick={() => {
                    credentials.username = 'guest'
                    onLogin()
                }}>
                    Demo: Login as Guest
                </BtnGestColor>
            </div>
            <div className='sign-up-btn-container'>
                <button className='btn-link' onClick={() => setIsSignup(!isSignup)}>
                    {!isSignup ? 'Need an account? Sign up' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    )
} 