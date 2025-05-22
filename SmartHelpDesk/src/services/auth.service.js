const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3035/api/'

async function loginWithGoogle(credential) {
    try {
        console.log('Attempting Google login with credential...')
        const response = await fetch(`${BASE_URL}auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': window.location.origin
            },
            body: JSON.stringify({ 
                credential,
                clientId: '228920500110-hep6uhlfmcbi56vth06ngnh876eljrq2.apps.googleusercontent.com'
            }),
            credentials: 'include'
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error('Server error:', errorData)
            throw new Error(errorData.error || 'Authentication failed')
        }
        
        const user = await response.json()
        console.log('Login successful:', user)
        return user
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

export const authService = {
    loginWithGoogle
}