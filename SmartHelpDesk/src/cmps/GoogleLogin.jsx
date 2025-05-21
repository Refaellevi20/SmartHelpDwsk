import { useEffect, useCallback } from 'react'
import { authService } from '../services/auth.service'

export function GoogleLogin({ onSuccess }) {
    const handleGoogleResponse = useCallback(async (response) => {
        try {
            console.log('Google response received:', response)
            const result = await authService.loginWithGoogle(response.credential)
            localStorage.setItem('loggedinUser', JSON.stringify(result))
            onSuccess?.(result)
        } catch (err) {
            console.error('Google login failed:', err)
        }
    }, [onSuccess])

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        
        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleGoogleResponse,
                auto_select: false,
                cancel_on_tap_outside: true
            })
            
            window.google.accounts.id.renderButton(
                document.getElementById('googleButton'),
                { 
                    theme: 'outline', 
                    size: 'large',
                    type: 'standard',
                    shape: 'rectangular',
                    text: 'continue_with',
                    logo_alignment: 'left'
                }
            )
        }
        
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
            // Clean up Google sign-in
            window.google?.accounts?.id?.cancel()
        }
    }, [handleGoogleResponse])

    return (
        <div className="google-login-container">
            <div id="googleButton"></div>
        </div>
    )
}