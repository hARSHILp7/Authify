import axios from "axios"

// Create Axios instance with base URL from .env
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// Request Interceptor
// Automatically attaches JWT token to every request
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response Interceptor
// handles expired or invalid token globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("authToken")
            localStorage.removeItem("authUser")
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// Auth API calls
export const signupUser = (data) => API.post('/api/auth/signup', data)
export const loginUser = (data) => API.post('/api/auth/login', data)
export const getMe = () => API.get('/api/auth/me')

export default API