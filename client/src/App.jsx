import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './Home.jsx'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import TestPage from './TestPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TestPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="flex items-center justify-center h-screen bg-[#1a1a1a]">
                  <h1 className="text-white text-3xl font-bold">
                    Hello there — You are logged in ✅
                  </h1>
                </div>
              </ProtectedRoute>
          } />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App