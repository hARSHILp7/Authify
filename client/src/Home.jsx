import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function Home() {
    const messages = [
            "Dream big, act bigger", "Make today count fully", "You are your limit",
            "Stay strong, keep going", "Believe and achieve it", "Small steps, big wins",
            "Shine even in darkness", "Keep moving forward", "Success needs patience",
            "Courage creates change", "Hustle beats talent", "Fear less, do more",
            "Growth starts in pain", "Win with your mindset", "Create your own path",
            "Do it with passion", "Be bold, stay humble", "Trust the long journey",
        ]

    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center gap-10 h-screen bg-darkBackground font-extralight">
            <div className="relative w-fit">
                <p className="text-lightBackground text-[56px] blur-[22px] select-none">
                {randomMessage}
                </p>
                <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">
                    {/* 🔒 */}
                    <FontAwesomeIcon icon={faLock} className="text-accent" />
                </span>
                </div>
            </div>
            <button
                onClick={() => navigate('/login')}
                className="border-accent border-[1px] text-[28px] text-accent font-normal px-4 py-2 rounded-lg transition duration-500 hover:bg-accent hover:text-darkBackground">
                Unlock
            </button>
        </div>
    )
}

export default Home