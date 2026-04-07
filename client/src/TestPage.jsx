import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from './context/AuthContext.jsx'

function TestPage() {
  const { user, token, login, logout } = useAuth()
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const navigate = useNavigate()

  const handleFakeLogin = () => {
    const fakeUser = {
        name: inputName || 'Test User',
        email: inputEmail || 'tester@gmail.com',
    }
    const fakeToken = 'fake-jwt-token-abc123'
    login(fakeUser, fakeToken)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-10 flex flex-col gap-6">

      <h1 className="text-3xl font-bold text-orange-500">🧪 Test Page</h1>
      <p className="text-gray-400">Testing Issue #2 — ProtectedRoute</p>

      {/* ── Auth State ── */}
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

      {/* ── Fake Login ── */}
      {!user && (
        <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-orange-400 font-semibold text-lg">Simulate Login</h2>
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
          <button
            onClick={handleFakeLogin}
            className="py-3 rounded-lg border border-orange-600 hover:bg-orange-600 transition-colors duration-300"
          >
            Simulate Login
          </button>
        </div>
      )}

      {/* ── Logged In ── */}
      {user && (
        <div className="border border-green-700 rounded-xl p-6 flex flex-col gap-3">
          <h2 className="text-green-400 font-semibold text-lg">✅ Logged In</h2>
          <p><span className="text-gray-400">Name: </span>{user.name}</p>
          <p><span className="text-gray-400">Email: </span>{user.email}</p>
          <button
            onClick={handleLogout}
            className="py-3 rounded-lg border border-red-600 hover:bg-red-600 transition-colors duration-300"
          >
            Simulate Logout
          </button>
        </div>
      )}

      {/* ── ProtectedRoute Test Buttons ── */}
      <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-orange-400 font-semibold text-lg">
          ProtectedRoute Tests
        </h2>
        <p className="text-gray-400 text-sm">
          Try visiting /dashboard while logged in and logged out.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="py-3 rounded-lg border border-orange-600 hover:bg-orange-600 transition-colors duration-300"
        >
          Go to dashboard
        </button>

        <button
          onClick={() => navigate('/login')}
          className="py-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors duration-300"
        >
          Go to /login
        </button>
      </div>

    </div>
  )
}

export default TestPage