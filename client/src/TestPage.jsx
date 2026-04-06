import { useState } from 'react'
import { useAuth } from './context/AuthContext.jsx'

function TestPage() {
  const { user, token, login, logout } = useAuth()
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')

  const handleFakeLogin = () => {
    const fakeUser = {
        name: inputName || 'Test User',
        email: inputEmail || 'tester@gmail.com',
    }
    const fakeToken = 'fake-jwt-token-abc123'
    login(fakeUser, fakeToken)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-10 flex flex-col gap-6">

      <h1 className="text-3xl font-bold text-orange-500">🧪 Test Page</h1>
      <p className="text-gray-400">Testing Issue #1 — AuthContext</p>

      {/* ── Auth State ── */}
      <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-3">
        <h2 className="text-orange-400 font-semibold text-lg">
          Current Auth State
        </h2>
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

      {/* ── Fake Login Form ── */}
      {!user && (
        <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-orange-400 font-semibold text-lg">
            Simulate Login
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
          <button
            onClick={handleFakeLogin}
            className="py-3 rounded-lg border border-orange-600 hover:bg-orange-600 transition-colors duration-300"
          >
            Simulate Login
          </button>
        </div>
      )}

      {/* ── Logged In Panel ── */}
      {user && (
        <div className="border border-green-700 rounded-xl p-6 flex flex-col gap-3">
          <h2 className="text-green-400 font-semibold text-lg">
            ✅ Logged In Successfully
          </h2>
          <p>
            <span className="text-gray-400">Name: </span>
            <span className="text-white">{user.name}</span>
          </p>
          <p>
            <span className="text-gray-400">Email: </span>
            <span className="text-white">{user.email}</span>
          </p>
          <p>
            <span className="text-gray-400">Token: </span>
            <span className="text-yellow-400 break-all">{token}</span>
          </p>
          <button
            onClick={logout}
            className="mt-2 py-3 rounded-lg border border-red-600 hover:bg-red-600 transition-colors duration-300"
          >
            Simulate Logout
          </button>
        </div>
      )}

      {/* ── localStorage Inspector ── */}
      <div className="border border-gray-700 rounded-xl p-6 flex flex-col gap-3">
        <h2 className="text-orange-400 font-semibold text-lg">
          localStorage Inspector
        </h2>
        <p>
          <span className="text-gray-400">authToken: </span>
          <span className="text-yellow-400">
            {localStorage.getItem('authToken') || 'empty'}
          </span>
        </p>
        <p>
          <span className="text-gray-400">authUser: </span>
          <span className="text-yellow-400">
            {localStorage.getItem('authUser') || 'empty'}
          </span>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 py-2 px-4 w-fit rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors text-sm"
        >
          🔄 Reload to Test Persistence
        </button>
      </div>

    </div>
  )
}

export default TestPage