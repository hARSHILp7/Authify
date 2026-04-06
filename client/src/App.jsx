import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './Home.jsx'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import TestPage from './TestPage.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App