import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import WelcomeMessage from "../components/WelcomeMessage"

function DashboardPage() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    // Reads isNewUser passed from LoginPage or SignUpPage
    const isNewUser = location.state?.isNewUser || false

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-darkBackground text-lightBackground flex flex-col items-center justify-center p-10 gap-8">
            {/* Welcome Message */}
            <WelcomeMessage isNewUser={isNewUser} />

            {/* User Info Card */}
            <div className="border border-accent rounded-2xl p-8 w-full max-w-md flex flex-col gap-4">
                
                <h2 className="text-accent font-semibold text-lg">
                    Account Details
                </h2>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <span className="text-lightBackground">Name</span>
                        <span className="text-lightBackground font-medium">{user?.name}</span>
                    </div>
                

                    <div className="w-full h-[1px] bg-accent" />

                    <div className="flex justify-between">
                        <span className="text-lightBackground">Email</span>
                        <span className="text-lightBackground font-medium">{user?.email}</span>
                    </div>

                    <div className="w-full h-[1px] bg-accent" />

                    <div className="flex justify-between">
                        <span className="text-lightBackground">Status</span>
                        <span className="text-lightBackground font-medium">✅ Authenticated</span>
                    </div>
                </div>

            </div>

            {/* Logout Button */}
            <button 
                onClick={handleLogout}
                className="w-full max-w-md py-4 rounded-xl border border-accent text-lightBackground font-medium text-lg hover:bg-accent hover:text-darkBackground transition-colors duration-300">
                Logout
            </button>
        </div>
    )
}

export default DashboardPage