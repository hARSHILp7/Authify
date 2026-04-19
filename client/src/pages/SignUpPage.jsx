import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faEye, faEyeSlash, faUser, faAt } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../context/AuthContext"
import { signupUser } from "../services/authService"

function SignUpPage() {
    const [name,            setName]            = useState('')
    const [username,        setUsername]        = useState('')
    const [email,           setEmail]           = useState('')
    const [password,        setPassword]        = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword,    setShowPassword]    = useState(false)
    const [showConfirm,     setShowConfirm]     = useState(false)
    const [errors,          setErrors]          = useState({})
    const [apiError,        setApiError]        = useState('')
    const [loading,         setLoading]         = useState(false)
    const [exiting,         setExiting]         = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleNavigate = (path) => {
        setExiting(true)
        setTimeout(() => navigate(path), 300)
    }

    // Validation function
    const validate = () => {
        const newErrors = {}

        // Name validation
        if (!name) {
            newErrors.name = "Name is required"
        } else if (name.length < 2) {
            newErrors.name = "Name must be at least 2 characters"
        }

        // Username validation
        if (!username) {
            newErrors.username = "Username is required"
        } else if (username.length < 3) {
            newErrors.username = "Username must be at least 3 characters"
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            newErrors.username = "Username can only contain letters, numbers, and underscores"
        }

        // Email validation
        if (!email) {
            newErrors.email = "Email is required"
        } else  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email address"
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        // Confirm password validation
        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords do not match"
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
            const response = await signupUser({ name, username, email, password })
            // Save user and token to AuthContext and localStorage
            login(response.data.user, response.data.token)
            //Redirect to dashboard as new user
            navigate('/dashboard', { state: { isNewUser: true } })
        } catch (error) {
            setApiError(
                error.response?.data?.message || 'Sign up failed. Please try again.'
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
                    <h1 className="text-paper text-4xl font-light">Sign Up</h1>
                    <p className="text-paper mt-1">
                        Already a member?{" "}
                        <button type="button" onClick={() => handleNavigate('/login')} className="text-coral">
                            Log in
                        </button>
                    </p>
                </div>

                {/* API Error */}
                {apiError && (
                    <div className="bg-red-500/10 border border-red rounded-lg px-4 py-3">
                        <p className="text-red text-sm">{apiError}</p>
                    </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1 mt-10">
                    <div className={`
                        group relative flex items-center gap-3 py-2
                        border-b transition-colors duration-300
                        ${errors.name
                        ? 'border-red'
                        : 'border-paper focus-within:border-coral'
                        }
                    `}>
                        <FontAwesomeIcon
                            icon={faUser}
                            className="text-paper group-focus-within:text-coral transition-colors duration-300"
                        />
                        <input
                            type="text"
                            placeholder=" "
                            autoComplete='off'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                if (errors.name) setErrors({ ...errors, name: '' })
                                if (apiError)    setApiError('')
                            }}
                            className="peer bg-transparent focus:outline-none w-full text-paper placeholder-transparent"
                        />
                        <label className="
                                absolute left-8 top-2
                                text-paper text-base
                                transition-all duration-300 pointer-events-none
                                peer-placeholder-shown:top-2
                                peer-placeholder-shown:text-base
                                peer-focus:-top-4
                                peer-focus:text-xs
                                peer-focus:text-coral
                                peer-[:not(:placeholder-shown)]:-top-4
                                peer-[:not(:placeholder-shown)]:text-xs">
                            Full Name
                        </label>
                    </div>
                    {errors.name && (
                        <p className="text-red text-xs mt-1">{errors.name}</p>
                    )}
                </div>

                {/* Username */}
                <div className="flex flex-col gap-1 mt-4">
                    <div className={`
                        group relative flex items-center gap-3 py-2
                        border-b transition-colors duration-300
                        ${errors.username
                        ? 'border-red'
                        : 'border-paper focus-within:border-coral'
                        }
                    `}>
                        <FontAwesomeIcon
                            icon={faAt}
                            className="text-paper group-focus-within:text-coral transition-colors duration-300"
                        />
                        <input
                            type="text"
                            placeholder=" "
                            autoComplete='off'
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                if (errors.username) setErrors({ ...errors, username: '' })
                                if (apiError)        setApiError('')
                            }}
                            className="peer bg-transparent focus:outline-none w-full text-paper placeholder-transparent"
                        />
                        <label className="
                                absolute left-8 top-2
                                text-paper text-base
                                transition-all duration-300 pointer-events-none
                                peer-placeholder-shown:top-2
                                peer-placeholder-shown:text-base
                                peer-focus:-top-4
                                peer-focus:text-xs
                                peer-focus:text-coral
                                peer-[:not(:placeholder-shown)]:-top-4
                                peer-[:not(:placeholder-shown)]:text-xs">
                            Username
                        </label>
                    </div>
                    {errors.username && (
                        <p className="text-red text-xs mt-1">{errors.username}</p>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1 mt-4">
                    <div className={`
                        group relative flex items-center gap-3 py-2
                        border-b transition-colors duration-300
                        ${errors.email
                        ? 'border-red'
                        : 'border-paper focus-within:border-coral'
                        }
                    `}>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-paper group-focus-within:text-coral transition-colors duration-300"
                        />
                        <input
                            type="email"
                            placeholder=" "
                            autoComplete='off'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (errors.email) setErrors({ ...errors, email: '' })
                                if (apiError)     setApiError('')
                            }}
                            className="peer bg-transparent focus:outline-none w-full text-paper placeholder-transparent"
                        />
                        <label className="
                                absolute left-8 top-2
                                text-paper text-base
                                transition-all duration-300 pointer-events-none
                                peer-placeholder-shown:top-2
                                peer-placeholder-shown:text-base
                                peer-focus:-top-4
                                peer-focus:text-xs
                                peer-focus:text-coral
                                peer-[:not(:placeholder-shown)]:-top-4
                                peer-[:not(:placeholder-shown)]:text-xs">
                            Email Address
                        </label>
                    </div>
                    {errors.email && (
                        <p className="text-red text-xs mt-1">{errors.email}</p>
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
                                if (apiError)        setApiError('')
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
                        <p className="text-red text-xs mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1 mt-4">
                    <div className={`
                        group relative flex items-center gap-3 py-2
                        border-b transition-colors duration-300
                        ${errors.confirmPassword
                        ? 'border-red'
                        : 'border-paper focus-within:border-coral'
                        }
                    `}>
                        <FontAwesomeIcon
                            icon={faLock}
                            className="text-paper group-focus-within:text-coral transition-colors duration-300"
                        />
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder=" "
                            autoComplete='off'
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' })
                                if (apiError)               setApiError('')
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
                            Confirm Password
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="text-paper hover:text-coral transition-colors"
                        >
                            <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 mt-6 rounded-xl border border-coral text-coral font-medium text-lg hover:bg-coral hover:text-black transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </div>
        </div>
    )
}

export default SignUpPage