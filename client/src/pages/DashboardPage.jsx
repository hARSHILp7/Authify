import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { deleteAccount } from "../services/authService"

function DashboardPage() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleDeleteAccount = async () => {
        await deleteAccount()
        logout()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-black text-paper flex flex-col items-center justify-center p-10 gap-8">
            <button
                onClick={() => navigate('/')}
                className="fixed top-6 right-8 text-paper hover:text-coral transition-colors duration-300"
            >
                <FontAwesomeIcon icon={faHouse} className="text-4xl" />
            </button>
            {/* User Info Card */}
            <div className="border border-coral rounded-2xl p-8 w-full max-w-md flex flex-col gap-4">
                
                <h2 className="text-coral font-semibold text-lg">
                    Account Details
                </h2>
                <div className="flex flex-col gap-3 mt-10">
                    <div className="flex justify-between">
                        <span className="text-paper">Name</span>
                        <span className="text-paper font-medium">{user?.name}</span>
                    </div>

                    {/* <div className="w-full h-[1px] bg-coral" /> */}

                    <div className="flex justify-between mt-4">
                        <span className="text-paper">Email</span>
                        <span className="text-paper font-medium">{user?.email}</span>
                    </div>

                    {/* <div className="w-full h-[1px] bg-coral" /> */}

                    <div className="flex justify-between mt-4">
                        <span className="text-paper">Status</span>
                        <span className="text-paper font-medium">✅ Authenticated</span>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full py-4 mt-6 rounded-xl border border-coral text-coral font-medium text-lg hover:bg-coral hover:text-black transition-colors duration-300">
                    Logout
                </button>

                {/* Delete Account Button */}
                <button
                    onClick={handleDeleteAccount}
                    className="w-full py-4 rounded-xl border border-red text-red font-medium text-lg hover:bg-red hover:text-black transition-colors duration-300">
                    Delete Account
                </button>

            </div>
        </div>
    )
}

export default DashboardPage