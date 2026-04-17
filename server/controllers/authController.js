import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
    )
}

// Signup
// POST /api/auth/signup
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email'
            })
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user with hashed password
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        //Generate token
        const token = generateToken(user._id)

        // Return user and token
        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error){
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        })
    }
}

// Login
// POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        // Find user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        // Generate token
        const token = generateToken(user._id)

        // Return user and token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        })
    }
}

// Get me
// GET /api/auth/me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json({
            message: 'User fetched successfully',
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        })
    }
}