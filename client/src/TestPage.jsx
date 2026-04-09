import { useState } from 'react'
import { useAuth } from './context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import WelcomeMessage from './components/WelcomeMessage.jsx'
import { loginUser, signupUser, getMe } from './services/authService'

function TestPage() {
  const { user, token, login, logout } = useAuth()
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Fake Login (no API)
  const handleFakeLogin = () => {
    const fakeUser = {
        name: inputName || 'Test User',
        email: inputEmail || 'tester@gmail.com',
    }
    login(fakeUser, 'fake-jwt-token-abc123')
    setIsNewUser(false)
    setShowWelcome(true)
  }

  // Fake Signup (no API)
  const handleFakeSignup = () => {
    const fakeUser = {
        name: inputName || 'Test User',
        email: inputEmail || 'tester@gmail.com',
    }
    login(fakeUser, 'fake-jwt-token-abc123')
    setIsNewUser(true)
    setShowWelcome(true)
  }

  // Real API login
  const handleApiLogin = async () => {
    setLoading(true)
    setApiError(null)
    setApiResponse(null)
    try {
      const response = await loginUser({
        email: inputEmail,
        password: inputPassword,
      })
      setApiResponse(response.data)
      login(response.data.user, response.data.token)
      setIsNewUser(false)
      setShowWelcome(true)
    } catch (error) {
      setApiError(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // Real API signup
  const handleApiSignup = async () => {
    setLoading(true)
    setApiError(null)
    setApiResponse(null)
    try {
      const response = await signupUser({
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      })
      setApiResponse(response.data)
      login(response.data.user, response.data.token)
      setIsNewUser(true)
      setShowWelcome(true)
    } catch (error) {
      setApiError(error.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  // Real API getMe
  const handleGetMe = async () => {
    setLoading(true)
    setApiError(null)
    setApiResponse(null)
    try {
      const response = await getMe()
      setApiResponse(response.data)
    } catch (error) {
      setApiError(error.response?.data?.message || 'Failed to get user')
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const handleLogout = () => {
    logout()
    setShowWelcome(false)
    setApiResponse(null)
    setApiError(null)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-10 flex flex-col gap-6">

      <h1 className="text-3xl font-bold text-orange-500">🧪 Test Page</h1>
      <p className="text-gray-400">Testing Issue #5 — authService.js</p>

      {/* Welcome Message */}
      {showWelcome && user && (
        <WelcomeMessage isNewUser={isNewUser} />
      )}

      {/* Auth State */}
      <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-3">
        <h2 className="text-orange-400 font-semibold text-lg">Current Auth State</h2>
        <p>
          <span className="text-gray-400">User: </span>
          <span className={user ? 'text-green-400' : 'text-red-400'}>
            {user ? JSON.stringify(user) : 'null — not logged in'}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Token: </span>
          <span className={token ? 'text-green-400' : 'text-red-400'}>
            {token ? token.substring(0, 30) + '...' : 'null — no token'}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Is Logged In: </span>
          <span className={user ? 'text-green-400' : 'text-red-400'}>
            {user ? '✅ true' : '❌ false'}
          </span>
        </p>
      </div>

      {/* Input Fields */}
      <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-orange-400 font-semibold text-lg">Input Fields</h2>
        <input
          type="text"
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="bg-transparent border-b border-gray-600 focus:border-orange-500 focus:outline-none py-2 text-white placeholder-gray-500 transition-colors"
        />
        <input
          type="email"
          placeholder="Email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          className="bg-transparent border-b border-gray-600 focus:border-orange-500 focus:outline-none py-2 text-white placeholder-gray-500 transition-colors"
        />
        <input
          type="password"
          placeholder="Password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="bg-transparent border-b border-gray-600 focus:border-orange-500 focus:outline-none py-2 text-white placeholder-gray-500 transition-colors"
        />
      </div>

      {/* Fake Buttons */}
      <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-orange-400 font-semibold text-lg">
          Simulate (No API)
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handleFakeLogin}
            disabled={!!user}
            className="flex-1 py-3 rounded-lg border border-orange-600 hover:bg-orange-600 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Fake Login
          </button>
          <button
            onClick={handleFakeSignup}
            disabled={!!user}
            className="flex-1 py-3 rounded-lg border border-green-600 hover:bg-green-600 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Fake Signup
          </button>
        </div>
      </div>

      {/* Real API Buttons */}
      <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-orange-400 font-semibold text-lg">
          Real API Calls
        </h2>
        <p className="text-gray-500 text-sm">
          ⚠️ These will only work once the backend is running.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleApiLogin}
            disabled={loading}
            className="flex-1 py-3 rounded-lg border border-orange-600 hover:bg-orange-600 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'API Login'}
          </button>
          <button
            onClick={handleApiSignup}
            disabled={loading}
            className="flex-1 py-3 rounded-lg border border-green-600 hover:bg-green-600 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'API Signup'}
          </button>
        </div>
        <button
          onClick={handleGetMe}
          disabled={loading || !user}
          className="py-3 rounded-lg border border-blue-600 hover:bg-blue-600 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'API Get Me (requires login)'}
        </button>
      </div>

      {/* API Response */}
      {apiResponse && (
        <div className="border border-green-700 rounded-xl p-6 flex flex-col gap-2">
          <h2 className="text-green-400 font-semibold text-lg">
            ✅ API Response
          </h2>
          <pre className="text-green-300 text-sm overflow-auto">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <div className="border border-red-700 rounded-xl p-6 flex flex-col gap-2">
          <h2 className="text-red-400 font-semibold text-lg">
            ❌ API Error
          </h2>
          <p className="text-red-300 text-sm">{apiError}</p>
        </div>
      )}

      {/* Logged In Actions */}
      {user && (
        <div className="border border-green-700 rounded-xl p-6 flex flex-col gap-3">
          <h2 className="text-green-400 font-semibold text-lg">✅ Logged In</h2>
          <p><span className="text-gray-400">Name: </span>{user.name}</p>
          <p><span className="text-gray-400">Email: </span>{user.email}</p>
          <button
            onClick={() => navigate('/dashboard', { state: { isNewUser } })}
            className="py-3 rounded-lg border border-orange-600 hover:bg-orange-600 transition-colors duration-300"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="py-3 rounded-lg border border-red-600 hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      )}

    </div>
  )
}

export default TestPage