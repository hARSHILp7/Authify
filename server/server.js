import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { signup, login, getMe } from './controllers/authController.js'
import protect from './middleware/authMiddleware.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// connect to MongoDB
connectDB()

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json())

// Test routes
app.get('/', (req, res) => {
    res.json({ message: '🚀 Authify server is running!' })
})

// Temporary test routes - remove after testing
app.post('/api/auth/signup', signup)
app.post('/api/auth/login', login)
app.get('/api/auth/me', protect, getMe)

// Auth routes - will be added in issue #15
// app.use('/api/auth', authRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`)
})

export default app