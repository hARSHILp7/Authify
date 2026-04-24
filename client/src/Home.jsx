import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faCircleUser, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import WelcomeMessage from './components/WelcomeMessage'

function Home() {
    const messages = [
            "Dream big, act bigger", "Make today count fully", "You are your limit",
            "Stay strong, keep going", "Believe and achieve it", "Small steps, big wins",
            "Shine even in darkness", "Keep moving forward", "Success needs patience",
            "Courage creates change", "Hustle beats talent", "Fear less, do more",
            "Growth starts in pain", "Win with your mindset", "Create your own path",
            "Do it with passion", "Be bold, stay humble", "Trust the long journey",
        ]

    const [randomMessage, setRandomMessage] = useState(
        () => localStorage.getItem('authify_message') || messages[0]
    )

    const shuffleMessage = () => {
        const next = messages[Math.floor(Math.random() * messages.length)]
        setRandomMessage(next)
        localStorage.setItem('authify_message', next)
    }
    const [exiting, setExiting] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuth()

    const isNewUser = location.state?.isNewUser
    const showWelcome = isNewUser !== undefined

    useEffect(() => {
        if (showWelcome) {
            window.history.replaceState({}, '')
        }
    }, [])

    const handleNavigate = (path) => {
        setExiting(true)
        setTimeout(() => navigate(path), 300)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-10 h-screen bg-black font-extralight overflow-hidden">
            {showWelcome && <WelcomeMessage isNewUser={isNewUser} />}
            {user && (
                <button
                    onClick={() => handleNavigate('/dashboard')}
                    className="fixed top-6 right-8 text-paper hover:text-coral transition-colors duration-300"
                >
                    <FontAwesomeIcon icon={faCircleUser} className="text-4xl" />
                </button>
            )}
            <div className={`flex flex-col items-center gap-10 ${exiting ? 'page-exit' : 'page-enter'}`}>
                <div className="relative w-fit">
                    <p className={`text-paper text-[56px] select-none transition-all duration-700 ${user ? '' : 'blur-[22px]'}`}>
                        {randomMessage}
                    </p>
                    {!user && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl">
                                <FontAwesomeIcon icon={faLock} className="text-coral" />
                            </span>
                        </div>
                    )}
                </div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={shuffleMessage}
                            className="border-coral border-[1px] text-[28px] text-coral font-normal px-4 py-2 rounded-lg transition duration-500 hover:bg-coral hover:text-black">
                            <FontAwesomeIcon icon={faShuffle} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => handleNavigate('/login')}
                        className="border-coral border-[1px] text-[28px] text-coral font-normal px-4 py-2 rounded-lg transition duration-500 hover:bg-coral hover:text-black">
                        Unlock
                    </button>
                )}
            </div>
        </div>
    )
}

export default Home
