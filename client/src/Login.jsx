import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-darkBackground font-extralight">
            <form className="flex-col border-accent border-[1px] rounded-xl p-10 w-1/4">
                <div className="text-4xl text-lightBackground">Log In</div>
                <div className="text-lightBackground">
                    Not a member? <a onClick={() => navigate('/signup')} className="text-accent font-medium cursor-pointer">Sign Up</a>
                </div>

                <div className="relative w-full text-lightBackground mt-16">
                    <label className="input-label">Username</label>
                    <input type="text" placeholder="" autoComplete="off" className="input-box"/>
                </div>
                    
                <div className="relative w-full text-lightBackground mt-10">
                    <label className="input-label">Password</label>
                    <input type="password" placeholder="" autoComplete="off" className="input-box"/>
                </div>

                <div className="flex gap-4 mt-2">
                    <button className="login-button">Log in</button>
                    <button onClick={() => navigate('/')} className="back-button">Back</button>
                </div>

            </form>
        </div>
    )
}

export default Login