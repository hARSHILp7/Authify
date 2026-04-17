import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req, res, next) => {
    try {
        let token

        // Check if token exists in Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }

        // No token found
        if (!token) {
            return res.status(401).json({
                message: 'Not authorized - no token provided',
            })
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Attach user to request
        req.user = await User.findById(decoded.id).select('-password')

        if (!req.user) {
            return res.status(401).json({
                message: 'Not authorized - user not found',
            })
        }

        next()
    } catch (error) {
        res.status(401).json({
            message: 'Not authorized - invalid token',
            error: error.message,
        })
    }
}

export default protect