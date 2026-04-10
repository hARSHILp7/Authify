import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../context/AuthContext"
import { loginUser } from "../services/authService"

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    // Validation function
    const validate = () => {
        const newErrors = {}

        // Email validation
        if (!email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email address"
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
            const response = await loginUser({ email, password })
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
        <div className="flex items-center justify-center min-h-screen bg-darkBackground">
            <div className="border border-accent rounded-2xl p-10 w-full max-w-lg flex flex-col gap-8">

                {/* Heading */}
                <div>
                    <h1 className="text-lightBackground text-4xl font-light">Log In</h1>
                    <p className="text-lightBackground mt-1">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-accent hover:text-accent transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* API Error */}
                {apiError && (
                    <div className="bg-red-500/10 border border-red-500 rounded-lg px-4 py-3">
                        <p className="text-red-500 text-sm">{apiError}</p>
                    </div>
                )}

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <div className={`
                        group relative flex items-center gap-3 py-2
                        border-b transition-colors duration-300
                        ${errors.email
                        ? 'border-red-500'
                        : 'border-lightBackground focus-within:border-accent'
                        }
                    `}>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-lightBackground group-focus-within:text-accent transition-colors duration-300"
                        />
                        <input
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (errors.email) setErrors({ ...errors, email: '' })
                                if (apiError)     setApiError('')
                            }}
                            className="peer bg-transparent focus:outline-none w-full text-lightBackground placeholder-transparent"
                        />
                        <label className="absolute left-8 top-2
                                text-lightBackground text-base
                                transition-all duration-300 pointer-events-none
                                peer-placeholder-shown:top-2
                                peer-placeholder-shown:text-base
                                peer-focus:-top-4
                                peer-focus:text-xs
                                peer-focus:text-accent
                                peer-[:not(:placeholder-shown)]:-top-4
                                peer-[:not(:placeholder-shown)]:text-xs">
                            Email Address
                        </label>
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <div className={`
                        group relative flex items-center gap-3 py-2
                        border-b transition-colors duration-300
                        ${errors.password
                        ? 'border-red-500'
                        : 'border-lightBackground focus-within:border-accent'
                        }
                    `}>
                        <FontAwesomeIcon
                            icon={faLock}
                            className="text-lightBackground group-focus-within:text-accent transition-colors duration-300"
                        />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder=" "
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (errors.password) setErrors({ ...errors, password: '' })
                                if (apiError)     setApiError('')
                            }}
                            className="peer bg-transparent focus:outline-none w-full text-lightBackground placeholder-transparent tracking-widest"
                        />
                    <label className="absolute left-8 top-2
                            text-lightBackground text-base tracking-normal
                            transition-all duration-300 pointer-events-none
                            peer-placeholder-shown:top-2
                            peer-placeholder-shown:text-base
                            peer-focus:-top-4
                            peer-focus:text-xs
                            peer-focus:text-accent
                            peer-[:not(:placeholder-shown)]:-top-4
                            peer-[:not(:placeholder-shown)]:text-xs">
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-lightBackground hover:text-accent transition-colors"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                    </p>
                )}
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-xl border border-accent text-lightBackground font-medium text-lg hover:bg-accent transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                {loading ? 'Logging in...' : 'Log In'}
                </button>

            </div>
            </div>
    )
}

export default LoginPage