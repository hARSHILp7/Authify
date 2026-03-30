function Login() {
    return (
        <div className="flex items-center justify-center h-screen bg-darkBackground font-extralight">
            <form className="flex-col border-accent border-[1px] rounded-xl p-10 w-1/4">
                <div className="text-4xl text-lightBackground">Log In</div>
                <div className="text-lightBackground">
                    Not a member? <a className="text-accent font-medium cursor-pointer">Sign Up</a>
                </div>

                <div className="relative w-full text-lightBackground mt-16">
                    <input type="text" 
                     placeholder="" 
                     autoComplete="off" 
                     className="peer w-full bg-transparent
                                border-b-[1px] border-accent
                                focus:border-b-[1px] focus:outline-none
                                px-2 py-3 text-lightBackground
                                transition-colors duration-500"
                     />
                    <label 
                     className="absolute left-2 top-3 text-accent text-base
                                transition-all duration-500 pointer-events-none
                                peer-placeholder-shown:top-3
                                peer-placeholder-shown:text-base
                                peer-hover:-top-4
                                peer-hover:text-sm
                                peer-hover:text-accent
                                peer-focus:-top-4
                                peer-focus:text-sm
                                peer-focus:text-accent
                                peer-[:not(:placeholder-shown)]:-top-4
                                peer-[:not(:placeholder-shown)]:text-sm">Username</label>
                </div>
                    
                <div className="relative w-full text-lightBackground mt-10">
                    <input type="password" 
                     placeholder="" 
                     autoComplete="off" 
                     className="peer w-full bg-transparent
                                border-b-[1px] border-accent
                                focus:border-b-[1px] focus:outline-none
                                px-2 py-3 text-lightBackground
                                transition-colors duration-500"
                     />
                    <label 
                     className="absolute left-2 top-3 text-accent text-base
                                transition-all duration-500 pointer-events-none
                                peer-placeholder-shown:top-3
                                peer-placeholder-shown:text-base
                                peer-hover:-top-4
                                peer-hover:text-sm
                                peer-hover:text-accent
                                peer-focus:-top-4
                                peer-focus:text-sm
                                peer-focus:text-accent
                                peer-[:not(:placeholder-shown)]:-top-4
                                peer-[:not(:placeholder-shown)]:text-sm">Password</label>
                </div>

                <button className="login-button">Log in</button>

            </form>
        </div>
    )
}

export default Login