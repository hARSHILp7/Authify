import express from 'express'
import { signup, login, getMe, deleteMe } from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// Public Routes
router.post('/signup', signup)
router.post('/login', login)

// Protected Routes
router.get('/me', protect, getMe)
router.delete('/me', protect, deleteMe)

export default router