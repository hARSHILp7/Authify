import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [ user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('authUser')
        return storedUser ? JSON.parse(storedUser) : null
    })

    const [ token, setToken] = useState(() => {
        return localStorage.getItem('authToken') || null
    })

    const login = (userData, jwtToken) => {
        localStorage.setItem('authToken', jwtToken)
        localStorage.setItem('authUser', JSON.stringify(userData))
        setToken(jwtToken)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}