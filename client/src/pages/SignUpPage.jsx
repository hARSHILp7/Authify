import { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function SignUpPage() {
    const [name,            setName]            = useState('')
    const [email,           setEmail]           = useState('')
    const [password,        setPassword]        = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword,    setShowPassword]    = useState(false)
    const [showConfirm,     setShowConfirm]     = useState(false)
    const [errors,          setErrors]          = useState({})
    const [loading,         setLoading]         = useState(false)

    // Validation function
    const validate = () => {
        const newErrors = {}

        // Name validation
        if (!name) {
            newErrors.name = "Name is required"
        } else if (name.length < 2) {
            newErrors.name = "Name must be at least 2 characters"
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
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        return newErrors
    }

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        setErrors({})
        setLoading(true)

        // API call will be added in issue #7
        console.log('Signup submitted:', { name, email, password })
        setLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-darkBackground">
            <div className="border border-orange-600 rounded-2xl p-10 w-full max-w-lg flex flex-col gap-8">

                {/* Heading */}
                <div>
                <h1 className="text-white text-4xl font-light">Sign Up</h1>
                <p className="text-lightBackground mt-1">
                    Already a member?{" "}
                    <Link to="/login" className="text-accent hover:text-accent transition-colors">
                    Log in
                    </Link>
                </p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                <div className={`
                    relative flex items-center gap-3 py-2
                    border-b transition-colors duration-300
                    ${errors.name
                    ? 'border-red-500'
                    : 'border-lightBackground focus-within:border-accent'
                    }
                `}>
                    <FontAwesomeIcon icon={faUser} className="text-lightBackground" />
                    <input
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        if (errors.name) setErrors({ ...errors, name: '' })
                    }}
                    className="peer bg-transparent focus:outline-none w-full text-white placeholder-transparent"
                    />
                    <label className="
                    absolute left-8 top-2
                    text-lightBackground text-base
                    transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-4
                    peer-focus:text-xs
                    peer-focus:text-accent
                    peer-[:not(:placeholder-shown)]:-top-4
                    peer-[:not(:placeholder-shown)]:text-xs
                    ">
                    Full Name
                    </label>
                </div>
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                <div className={`
                    relative flex items-center gap-3 py-2
                    border-b transition-colors duration-300
                    ${errors.email
                    ? 'border-red-500'
                    : 'border-lightBackground focus-within:border-accent'
                    }
                `}>
                    <FontAwesomeIcon icon={faEnvelope} className="text-lightBackground" />
                    <input
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors({ ...errors, email: '' })
                    }}
                    className="peer bg-transparent focus:outline-none w-full text-white placeholder-transparent"
                    />
                    <label className="
                    absolute left-8 top-2
                    text-lightBackground text-base
                    transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-4
                    peer-focus:text-xs
                    peer-focus:text-accent
                    peer-[:not(:placeholder-shown)]:-top-4
                    peer-[:not(:placeholder-shown)]:text-xs
                    ">
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
                    relative flex items-center gap-3 py-2
                    border-b transition-colors duration-300
                    ${errors.password
                    ? 'border-red-500'
                    : 'border-lightBackground focus-within:border-accent'
                    }
                `}>
                    <FontAwesomeIcon icon={faLock} className="text-lightBackground" />
                    <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder=" "
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        if (errors.password) setErrors({ ...errors, password: '' })
                    }}
                    className="peer bg-transparent focus:outline-none w-full text-white placeholder-transparent tracking-widest"
                    />
                    <label className="
                    absolute left-8 top-2
                    text-lightBackground text-base tracking-normal
                    transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-4
                    peer-focus:text-xs
                    peer-focus:text-accent
                    peer-[:not(:placeholder-shown)]:-top-4
                    peer-[:not(:placeholder-shown)]:text-xs
                    ">
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
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                <div className={`
                    relative flex items-center gap-3 py-2
                    border-b transition-colors duration-300
                    ${errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-lightBackground focus-within:border-accent'
                    }
                `}>
                    <FontAwesomeIcon icon={faLock} className="text-lightBackground" />
                    <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' })
                    }}
                    className="peer bg-transparent focus:outline-none w-full text-white placeholder-transparent tracking-widest"
                    />
                    <label className="
                    absolute left-8 top-2
                    text-lightBackground text-base tracking-normal
                    transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-4
                    peer-focus:text-xs
                    peer-focus:text-accent
                    peer-[:not(:placeholder-shown)]:-top-4
                    peer-[:not(:placeholder-shown)]:text-xs
                    ">
                    Confirm Password
                    </label>
                    <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-lightBackground hover:text-accent transition-colors"
                    >
                    <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
                </div>

                {/* Submit Button */}
                <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 rounded-xl border border-accent text-white font-medium text-lg hover:bg-accent transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                {loading ? 'Creating account...' : 'Sign Up'}
                </button>

            </div>
        </div>
    )
}

export default SignUpPage