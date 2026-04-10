import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// connect to MongoDB
connectDB()

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())

// Test routes
app.get('/', (req, res) => {
    res.json({ message: 'Authify server is running!' })
})

// Auth routes - will be added in issue #15
// app.use('/api/auth', authRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app