import { use, useState } from 'react'
import { useAuth } from './context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import WelcomeMessage from './components/WelcomeMessage.jsx'

function TestPage() {
  const { user, token, login, logout } = useAuth()
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const navigate = useNavigate()

  const handleFakeLogin = () => {
    const fakeUser = {
        name: inputName || 'Test User',
        email: inputEmail || 'tester@gmail.com',
    }
    const fakeToken = 'fake-jwt-token-abc123'
    login(fakeUser, fakeToken)
    setIsNewUser(false)
    setShowWelcome(true)
  }

  const handleFakeSignup = () => {
    const fakeUser = {
        name: inputName || 'Test User',
        email: inputEmail || 'tester@gmail.com',
    }
    const fakeToken = 'fake-jwt-token-abc123'
    login(fakeUser, fakeToken)
    setIsNewUser(true)
    setShowWelcome(true)
  }

  const handleLogout = () => {
    logout()
    setShowWelcome(false)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-10 flex flex-col gap-6">

      <h1 className="text-3xl font-bold text-orange-500">🧪 Test Page</h1>
      <p className="text-gray-400">Testing Issue #4 — DashboardPage</p>

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
            {token || 'null — no token'}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Is Logged In: </span>
          <span className={user ? 'text-green-400' : 'text-red-400'}>
            {user ? '✅ true' : '❌ false'}
          </span>
        </p>
      </div>

      {/* Fake Login/Signup */}
      {!user && (
        <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-orange-400 font-semibold text-lg">
            Simulate Login / Signup
          </h2>
          <input
            type="text"
            placeholder="Enter name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="bg-transparent border-b border-gray-600 focus:border-orange-500 focus:outline-none py-2 text-white placeholder-gray-500 transition-colors"
          />
          <input
            type="email"
            placeholder="Enter email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="bg-transparent border-b border-gray-600 focus:border-orange-500 focus:outline-none py-2 text-white placeholder-gray-500 transition-colors"
          />
          <div className="flex gap-4">
            <button
              onClick={handleFakeLogin}
              className="flex-1 py-3 rounded-lg border border-orange-600 hover:bg-orange-600 transition-colors duration-300"
            >
              Simulate Login
            </button>
            <button
              onClick={handleFakeSignup}
              className="flex-1 py-3 rounded-lg border border-green-600 hover:bg-green-600 transition-colors duration-300"
            >
              Simulate Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Logged In */}
      {user && (
        <div className="border border-green-700 rounded-xl p-6 flex flex-col gap-3">
          <h2 className="text-green-400 font-semibold text-lg">✅ Logged In</h2>
          <p><span className="text-gray-400">Name: </span>{user.name}</p>
          <p><span className="text-gray-400">Email: </span>{user.email}</p>
          <p>
            <span className="text-gray-400">User Type: </span>
            <span className="text-orange-400">
              {isNewUser ? 'New User 🎉' : 'Returning User 👋'}
            </span>
          </p>

          {/* Navigate to Dashboard */}
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
            Simulate Logout
          </button>
        </div>
      )}

    </div>
  )
}

export default TestPage