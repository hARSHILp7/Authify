import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function WelcomeMessage({ isNewUser }) {
    const { user } = useAuth()
    const [visible, setVisible] = useState(false)
    const [show, setShow] = useState(true)

    useEffect(() => {
        // Fade in
        setTimeout(() => setVisible(true), 100)

        // Auto dismiss after 5 seconds
        const timer = setTimeout(() => {
            setVisible(false)
            setTimeout(() => setShow(false), 500) // Wait for fade out before unmounting
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    if (!show) return null

    return (
        <div className={`
                fixed bottom-6 left-6 z-50 w-80
                transition-all duration-500
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
              `}>
            <div className="bg-darkBackground border border-accent rounded-2xl p-8 text-center flex flex-col gap-3">
                {/* Icon */}
                <div className="text-5xl">
                    {isNewUser ? '🎉' : '👋'}
                </div>

                {/* Message */}
                <h1 className="text-lightBackground text-3xl font-bold">
                    {isNewUser
                        ? `Welcome to Authify, ${user?.name}!`
                        : `Welcome back, ${user?.name}!`
                    }
                </h1>

                {/* Sub message */}
                <p className="text-darkBackground text-ms">
                    {isNewUser
                        ? `Your account has been created successfully.`
                        : `Great to see you again.`
                    }
                </p>

                {/* Dismiss button */}
                <button 
                    onClick={() => {
                        setVisible(false)
                        setTimeout(() => setShow(false), 500)
                    }}
                    className="mt-2 text-darkbackground hover:text-accent text-sm transition-colors duration-300">
                    Dismiss →
                </button>
            </div>
        </div>
    )
}

export default WelcomeMessage