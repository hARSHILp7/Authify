import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, redirectTo = "/login" }) {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to={redirectTo} replace />
    }

    return children
}

export default ProtectedRoute