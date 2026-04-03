import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App