import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAt, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../context/AuthContext"
import { loginUser } from "../services/authService"

function LoginPage() {
    const [useEmail, setUseEmail] = useState(false)
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState('')
    const [loading, setLoading] = useState(false)
    const [exiting, setExiting] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleNavigate = (path) => {
        setExiting(true)
        setTimeout(() => navigate(path), 300)
    }

    const handleToggle = () => {
        setUseEmail(!useEmail)
        setIdentifier('')
        setErrors({})
        setApiError('')
    }

    // Validation function
    const validate = () => {
        const newErrors = {}

        if (!identifier) {
            newErrors.identifier = useEmail ? "Email is required" : "Username is required"
        } else if (useEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
            newErrors.identifier = "Enter a valid email address"
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        return newErrors
    }

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Run validation first
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        setErrors({})
        setApiError('')
        setLoading(true)

        try {
            // Call the backend API
            const payload = useEmail ? { email: identifier, password } : { username: identifier, password }
            const response = await loginUser(payload)
            // Save user and token to AuthContext and localStorage
            login(response.data.user, response.data.token)
            // Redirect to dashboard as returning user
            navigate('/dashboard', { state: { isNewUser: false } })
        } catch (error) {
            setApiError(
                error.response?.data?.message || 'Login failed. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className={`border border-coral rounded-2xl p-10 w-full max-w-lg flex flex-col gap-8 ${exiting ? 'page-exit' : 'page-enter'}`}>

                {/* Heading */}
                <div>
                    <h1 className="text-paper text-4xl font-light">Log In</h1>
                    <p className="text-paper mt-1">
                        Don't have an account?{" "}
                        <button type="button" onClick={() => handleNavigate('/signup')} className="text-coral">
                            Sign up
                        </button>
                    </p>
                </div>

                {/* API Error */}
                {apiError && (
                    <div className="bg-red-500/10 border border-red rounded-lg px-4 py-3">
                        <p className="text-red text-sm">{apiError}</p>
                    </div>
                )}

                {/* Username / Email */}
                <div className="flex flex-col gap-1 mt-10">
                    <div className={`
                        group relative flex items-center gap-3 py-2
                        border-b transition-colors duration-300
                        ${errors.identifier
                        ? 'border-red'
                        : 'border-paper focus-within:border-coral'
                        }
                    `}>
                        <FontAwesomeIcon
                            icon={useEmail ? faEnvelope : faAt}
                            className="text-paper group-focus-within:text-coral transition-colors duration-300"
                        />
                        <input
                            type={useEmail ? 'email' : 'text'}
                            placeholder=" "
                            autoComplete='off'
                            value={identifier}
                            onChange={(e) => {
                                setIdentifier(e.target.value)
                                if (errors.identifier) setErrors({ ...errors, identifier: '' })
                                if (apiError)          setApiError('')
                            }}
                            className="peer bg-transparent focus:outline-none w-full text-paper placeholder-transparent"
                        />
                        <label className="absolute left-8 top-2
                                text-paper text-base
                                transition-all duration-300 pointer-events-none
                                peer-placeholder-shown:top-2
                                peer-placeholder-shown:text-base
                                peer-focus:-top-4
                                peer-focus:text-xs
                                peer-focus:text-coral
                                peer-[:not(:placeholder-shown)]:-top-4
                                peer-[:not(:placeholder-shown)]:text-xs">
                            {useEmail ? 'Email Address' : 'Username'}
                        </label>
                    </div>
                    {errors.identifier && (
                        <p className="text-red text-xs mt-1">{errors.identifier}</p>
                    )}
                    {!useEmail && (
                        <p className="text-paper text-xs mt-1">
                            Don't remember the username?{" "}
                            <button type="button" onClick={handleToggle} className="text-coral">
                                Login with email
                            </button>
                        </p>
                    )}
                    {useEmail && (
                        <p className="text-paper text-xs mt-1">
                            Remembered your username?{" "}
                            <button type="button" onClick={handleToggle} className="text-coral">
                                Login with username
                            </button>
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1 mt-4">
                    <div className={`
                        group relative flex items-center gap-3 py-2
                        border-b transition-colors duration-300
                        ${errors.password
                        ? 'border-red'
                        : 'border-paper focus-within:border-coral'
                        }
                    `}>
                        <FontAwesomeIcon
                            icon={faLock}
                            className="text-paper group-focus-within:text-coral transition-colors duration-300"
                        />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder=" "
                            autoComplete='off'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (errors.password) setErrors({ ...errors, password: '' })
                                if (apiError)     setApiError('')
                            }}
                            className="peer bg-transparent focus:outline-none w-full text-paper placeholder-transparent tracking-widest"
                        />
                    <label className="absolute left-8 top-2
                            text-paper text-base tracking-normal
                            transition-all duration-300 pointer-events-none
                            peer-placeholder-shown:top-2
                            peer-placeholder-shown:text-base
                            peer-focus:-top-4
                            peer-focus:text-xs
                            peer-focus:text-coral
                            peer-[:not(:placeholder-shown)]:-top-4
                            peer-[:not(:placeholder-shown)]:text-xs">
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-paper hover:text-coral transition-colors"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red text-xs mt-1">
                        {errors.password}
                    </p>
                )}
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 mt-6 rounded-xl border border-coral text-coral font-medium text-lg hover:bg-coral hover:text-black transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>

            </div>
            </div>
    )
}

export default LoginPage
